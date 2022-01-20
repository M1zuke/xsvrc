import { CheckBox, CheckBoxOutlineBlank, Delete } from '@mui/icons-material';
import classNames from 'classnames';
import React, { PropsWithChildren, ReactElement, useCallback, useMemo, useState } from 'react';
import { compare } from '../../store/friends/actions';
import { Button } from '../button/Button';
import { TextInput } from '../input/TextInput';
import styles from './MultipleChoiceComboBox.module.scss';

export type MultipleChoiceOption = {
  notChangeable?: boolean;
  value: string;
  active?: boolean;
  label: string;
};

type MultipleChoiceComboBoxProps = {
  showChosenOptions?: boolean;
  options: MultipleChoiceOption[];
  searchPlaceholder?: string;
  onChange: (options: MultipleChoiceOption[]) => void;
};

export function MultipleChoiceComboBox({
  options,
  children,
  showChosenOptions,
  onChange,
  searchPlaceholder,
}: PropsWithChildren<MultipleChoiceComboBoxProps>): ReactElement {
  const [showOptions, setShowOptions] = useState(false);
  const [optionFilter, setOptionFilter] = useState('');
  const chosenOptions = useMemo(() => options.filter((o) => o.active).length, [options]);

  const changeOptionActiveState = useCallback(
    (value: string) => {
      onChange([
        ...options.map((o) => (o.value === value ? { ...o, active: o.notChangeable ? o.active : !o.active } : o)),
      ]);
    },
    [onChange, options],
  );

  const clearActiveOptions = useCallback(() => {
    onChange([...options.map((o) => ({ ...o, active: o.notChangeable ? o.active : false }))]);
  }, [onChange, options]);

  const renderedOptions = useMemo(() => {
    return options
      .filter((o) => (optionFilter !== '' ? o.label.toLowerCase().includes(optionFilter.toLowerCase()) : true))
      .sort((a, b) => compare(a.label, b.label))
      .map((o) => {
        return (
          <div
            key={`Filter-Option-${o.label}-${o.value}`}
            onClick={() => !o.notChangeable && changeOptionActiveState(o.value)}
            className={classNames(styles.Option, { [styles.Disabled]: o.notChangeable })}
          >
            {o.active ? <CheckBox /> : <CheckBoxOutlineBlank />}
            {o.label}
          </div>
        );
      });
  }, [changeOptionActiveState, optionFilter, options]);

  return (
    <>
      {showOptions && <div className={styles.BackDrop} onClick={() => setShowOptions(false)} />}
      <div className={styles.MultipleChoiceComboBox}>
        <div className={classNames(styles.Buttons, { [styles.OptionsVisible]: showOptions })}>
          <Button className={styles.DropDownButton} onClick={() => setShowOptions(!showOptions)}>
            {showChosenOptions ? `(${chosenOptions})` : ''} {children}
          </Button>
          <Button icon className={styles.ClearFilterButton} onClick={() => clearActiveOptions()}>
            <Delete />
          </Button>
        </div>
        {showOptions && (
          <div className={styles.Options}>
            <div className={styles.Option}>
              <TextInput onChange={setOptionFilter} placeholder={searchPlaceholder} value={optionFilter} />
            </div>
            {renderedOptions}
          </div>
        )}
      </div>
    </>
  );
}
