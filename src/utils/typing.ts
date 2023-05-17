interface Options {
  source: HTMLElement | null
  output: HTMLElement | null
  delay?: number
  done?: Function
}
interface Chain {
  parent: any
  dom: HTMLElement
  val: any
}
class Typing {
  opts: Options;
  source: HTMLElement;
  output: HTMLElement;
  delay: number;
  chain: Chain;
  done?: Function;
  timer?: NodeJS.Timeout | null;
  constructor(opts: Options) {
    this.opts = opts || {};
    this.source = opts.source!;
    this.output = opts.output!;
    this.delay = opts.delay || 120;
    this.chain = {
      parent: null,
      dom: this.output!,
      val: []
    };
    if (!this.opts.done || !(typeof this.opts.done === 'function')) this.opts.done = function () {};
  }

  init() {
    //初始化函数
    this.chain.val = this.convert(this.source, this.chain.val);
  }

  convert(dom: ChildNode, arr: any) {
    //将dom节点的子节点转换成数组，
    let children = Array.from(dom.childNodes)
    for (let i = 0; i < children.length; i++) {
      let node = children[i]
      if (node.nodeType === 3) {
        arr = arr.concat(node?.nodeValue?.split(''))   //将字符串转换成字符串数组，后面打印时才会一个一个的打印
      } else if (node.nodeType === 1) {
        let val: any = []
        val = this.convert(node, val)
        arr.push({
          'dom': node,
          'val': val
        })
      }
    }
    return arr
  }

  print(dom: HTMLElement, val: string, callback: Function) {
    let self = this;
    this.timer = setTimeout(function () {
      self.destory()
      dom.appendChild(document.createTextNode(val));
      callback();
    }, this.delay);
  }
  destory() {
    if(this.timer) {
      clearTimeout(this.timer)
    }
  }
  play(ele: Chain) {
    //当打印最后一个字符时，动画完毕，执行done
    if (!ele.val.length) {
      if (ele.parent) this.play(ele.parent);
      else if(this.opts.done) this.opts.done();
      return;
    }
    let current = ele.val.shift()  //获取第一个元素，同时删除数组中的第一个元素
    if (typeof current === 'string') {
      this.print(ele.dom, current, () => {
        this.play(ele); //继续打印下一个字符
      })
    } else {
      let dom = current.dom.cloneNode() //克隆节点，不克隆节点的子节点，所以不用加参数true
      ele.dom.appendChild(dom)
      this.play({
        parent: ele,
        dom,
        val: current.val
      })
    }
  }

  start() {
    this.init();
    console.log('chain===', this.chain)
    this.play(this.chain);
  }
}

export default Typing