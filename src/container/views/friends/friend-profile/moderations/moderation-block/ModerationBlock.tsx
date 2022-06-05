import classNames from 'classnames';
import React, { ElementType, ReactElement, useMemo } from 'react';
import styles from './ModerationBlock.module.scss';

export type ModerationBlockIcon = {
  icon: ElementType;
  onClick: () => void;
  active?: boolean;
};

type ModerationBlockProps = {
  span2?: boolean;
  oneIcon?: boolean;
  title: string;
  icons: ModerationBlockIcon[];
};

export function ModerationBlock({ span2, title, icons, oneIcon }: ModerationBlockProps): ReactElement {
  const renderedIcons = useMemo(() => {
    return icons.map((icon, index) => {
      const Icon = icon.icon;
      return (
        <Icon
          key={`icon-${index}`}
          className={classNames(styles.Icon, { [styles.Active]: icon.active })}
          onClick={icon.onClick}
        />
      );
    });
  }, [icons]);

  return (
    <div className={classNames(styles.ModerationBlock, { [styles.Span2]: span2, [styles.OneIcon]: oneIcon })}>
      {renderedIcons}
      <div className={styles.ModerationTitle}>{title}</div>
    </div>
  );
}
