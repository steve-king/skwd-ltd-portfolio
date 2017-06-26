import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { IconButton } from 'modules/button';

const ButtonTab = ({ position, action, text, icon, direction, hide }) => {
  const tabClass = 'buttonTab';
  const positionClass = position ? `${tabClass}--${position}` : '';
  const hideClass = hide ? `${tabClass}--hide-${hide}` : '';
  return (
    <div className={classNames(tabClass, positionClass, hideClass)}>
      <IconButton action={action} text={text} icon={icon} direction={direction} />
    </div>
  );
}

ButtonTab.PropTypes = {
  hide: PropTypes.oneOf(['mobile']),
  position: PropTypes.oneOf(['top', 'left']),
  direction: PropTypes.oneOf(['up', 'left']),
};

export default ButtonTab;