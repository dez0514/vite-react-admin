// 扁平数组
export const flatArr = (arr: any, result: any = []) => {
  arr.forEach((item: any) => {
    result.push({ ...item })
    if(item.children) {
      flatArr(item.children, result)
    }
  })
  return [...result]
}