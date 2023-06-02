import styles from "./index.module.scss"

const TextHover = ({ className, text }: { className: string, text: string }) => {
  return (
    <a className={`${styles.mallki} ${className}`} href="#/">
      {text}
      <span data-letters={text} />
      <span data-letters={text} />
    </a>
  );
};


export default TextHover