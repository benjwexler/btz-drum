
import React, {useEffect, useState} from 'react';
import cx from 'classnames';

const ToggleButton = ({
  id,
  className,
  style,
  line1,
  line2,
  onClick
}) => {

  const [isActive, setIsActive] = useState(false)
  return (
    <div
      id={id}
      className={cx(
        "toggleButton",
        className,
      )}
      style={style}
      onClick={onClick}
    >
      {line1}
      <br />
      {line2}
    </div>
  )
}

export default ToggleButton;
