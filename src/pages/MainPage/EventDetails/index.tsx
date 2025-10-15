import {useParams} from 'react-router-dom';
import {Typography} from '@mui/material';

import {CardBox} from '@shared/components';
import {Header} from '@widgets/common';

import {COLOR__WHITE} from '@/theme/colors';

export const EventDetailsPage = () => {
  const {id} = useParams<{id: string}>();

  return (
    <>
      <Header title={`Event ${id}`} mb={1} />

      <CardBox bgcolor={COLOR__WHITE}>
        <Typography whiteSpace="pre-line">
          {`Самая главная функция — завершение ивента. При завершении ивента админу (контент-менеджеру) необходимо добавить в соответствующее поле описание исхода ивента и выбрать исход Yes / No. 
●\tИмеется возможность отобразить данные на конкретную дату или за конкретный период.
●\tИмеется возможность закрыть возможность торговли на ивенте.
●\tИмеется возможность скопировать ивент (создать новый ивент, в котором будет продублирована информация из текущего). 
●\tИмеется возможность удалить ивент. 
●\tИмеется возможность сделать ивент повторяющимся (валидно для ивентов типа “Будет ли BTC стоить $99000 к 12:00 7 марта?”)

Редактируемые поля:
●\tНазвание ивента
●\tОписание ивента
●\tИсход и описание исхода
●\tSource of truth
●\tEvent’s latest news
●\tДата окончания ивента
●\tЦена Yes и No
●\tПравильный ответ на вопрос или ответы на вопросы для Poll Event
`}
        </Typography>
      </CardBox>
    </>
  );
};
