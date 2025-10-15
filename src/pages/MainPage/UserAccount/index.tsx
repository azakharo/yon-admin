import {useParams} from 'react-router-dom';
import {Typography} from '@mui/material';

import {CardBox} from '@shared/components';
import {Header} from '@widgets/common';

import {COLOR__WHITE} from '@/theme/colors';

export const UserAccountPage = () => {
  const {id} = useParams<{id: string}>();

  return (
    <>
      <Header title={`User ${id}`} mb={1} />

      <CardBox bgcolor={COLOR__WHITE}>
        <Typography whiteSpace="pre-line">
          {`В профиле пользователя (User Account) отображается вся информация о пользователе. Информация о пользователе в его профиле полнее, чем мы видим в общей табличке в разделе Accounts.

        ●	Имеется возможность забанить / разбанить аккаунт.
        ●	Имеется возможность наложить ограничения на аккаунт.
        ●	Имеется возможность начислить / списать промо-деньги.
        ●	Имеется возможность начислить / списать реальные деньги на балансе.
        ●	Имеется возможность вручную изменять некоторые поля — полный список в таблице.
        ●	Имеется возможность оставить внутренний комментарий в аккаунте пользователя.
        ●	Имеется возможность отобразить историю активности пользователя (User stats, User events, User transactions history, User trading history, User referral history, User communications history и т.д.) на конкретную дату или за конкретный период`}
        </Typography>
      </CardBox>
    </>
  );
};
