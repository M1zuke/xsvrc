import { useCallback, useMemo } from 'react';
import { AvatarInfo } from '../../api/types';
import { DropDownOption, RowOption, TableConfig } from '../../components/table/Table';

export function useEditAvatarTableModel(
  avatarInfo: AvatarInfo,
  onChange: (avatarInfo: AvatarInfo) => void,
): TableConfig {
  const updateChanges = useCallback(
    <K extends keyof AvatarInfo, V extends AvatarInfo[K] = AvatarInfo[K]>(key: K) =>
      (value: V) => {
        onChange({
          ...avatarInfo,
          [key]: value,
        });
      },
    [avatarInfo, onChange],
  );

  return useMemo<TableConfig>(() => {
    return {
      columns: [{ amount: 2 }],
      rows: [
        {
          id: 'edit-name',
          values: [
            { value: 'Avatar-Name:' },
            {
              type: 'text',
              value: avatarInfo.name,
              editable: true,
              onChange: updateChanges('name'),
            },
          ],
        },
        {
          id: 'edit-description',
          values: [
            { value: 'Description:' },
            {
              type: 'text',
              value: avatarInfo.description,
              editable: true,
              onChange: updateChanges('description'),
            },
          ],
        },
        {
          id: 'edit-release-state',
          values: [
            { value: 'Release state:' },
            {
              type: 'dropdown',
              value: avatarInfo.releaseStatus,
              onChange: updateChanges('releaseStatus'),
              options: [
                { label: 'Public', value: 'public' },
                { label: 'Private', value: 'private' },
              ],
            } as DropDownOption<string>,
          ],
        },
      ] as RowOption[],
    };
  }, [avatarInfo.description, avatarInfo.name, avatarInfo.releaseStatus, updateChanges]);
}
