import {FC, useState} from 'react';
import {create, InstanceProps} from 'react-modal-promise';
import {Button, DialogActions, DialogContent, Stack} from '@mui/material';

import {Dialog, DialogTitle} from '@shared/components';
import {SupportedLanguage, TranslationDict} from '@shared/types';
import {Item} from './Item';

interface Props extends InstanceProps<TranslationDict, void> {
  enTrans: string;
  initialTranslations: TranslationDict;
  fieldName: string;
  isMultiLineText?: boolean;
}

const AddTranslationsDialog: FC<Props> = ({
  enTrans,
  initialTranslations,
  fieldName,
  onReject,
  onResolve,
  isMultiLineText = false,
}) => {
  const [translations, setTranslations] = useState<TranslationDict>(() => {
    const trans = {...initialTranslations};
    trans.English = enTrans;

    return trans;
  });

  const handleCancel = () => {
    onReject();
  };

  const handleLangTransChange = (lang: SupportedLanguage, trans: string) => {
    const newTranslations = {...translations};
    newTranslations[lang] = trans;
    setTranslations(newTranslations);
  };

  const handleApply = () => {
    onResolve(translations);
  };

  return (
    <Dialog onClose={handleCancel} open={true}>
      <DialogTitle
        title={`Add translations for "${fieldName}"`}
        onClose={handleCancel}
      />

      <DialogContent sx={{width: 600, maxWidth: '90vw'}}>
        <Stack maxHeight="60vh" sx={{overflowY: 'auto'}} mt={2} spacing={2}>
          {Object.values(SupportedLanguage).map(lang => {
            return (
              <Item
                key={lang}
                lang={lang}
                trans={translations[lang]}
                onChange={handleLangTransChange}
                isMultiLineText={isMultiLineText}
              />
            );
          })}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" fullWidth onClick={handleCancel}>
          Cancel
        </Button>

        <Button fullWidth onClick={handleApply}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const openAddTranslationsDialog = create(AddTranslationsDialog);
