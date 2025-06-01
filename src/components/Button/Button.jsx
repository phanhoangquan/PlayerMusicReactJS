import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ className, to, href, primary = false, children, onClick, ...passProps }) {
   let Comp = 'button';
   const props = {
      onClick,
      ...passProps,
   };
   if (to) {
      props.to = to;
      Comp = Link;
   } else if (href) {
      props.href = href;
      Comp = 'a';
   }
   const classes = cx('wrapper', { [className]: className, primary });
   return (
      <Comp className={classes} {...props}>
         <span>{children}</span>
      </Comp>
   );
}

export default Button;
