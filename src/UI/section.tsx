import classes from "./Section.module.css";

const Section: React.FC<{ styleName: {}; className?: {} }> = (props) => {
  return (
    <section
      className={`${classes.section} ${props.className}`}
      style={props.styleName}
    >
      {props.children}
    </section>
  );
};

export default Section;
