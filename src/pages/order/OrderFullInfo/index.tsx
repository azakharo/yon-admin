import {useParams} from 'react-router-dom';
import {Box, Divider} from '@mui/material';
import {format} from 'date-fns';
import capitalize from 'lodash/capitalize';
import isNil from 'lodash/isNil';

import {OrderFullInfo, useGetOrderFullInfo} from '@entities/order';
import {
  CardBox,
  Item,
  NumberValue,
  PrimaryLabel,
  SecondaryLabel,
  StringValue,
} from '@shared/components';
import {DATETIME_FORMAT} from '@shared/constants';
import {BaseWidgetLayout, Header} from '@widgets/common';

import {COLOR__WHITE} from '@/theme/colors';

const cardBoxCommonProps = {
  bgcolor: COLOR__WHITE,
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5,
} as const;

export const OrderFullInfoPage = () => {
  const {id: orderId} = useParams<{id: string}>();

  const {data, isPending, error} = useGetOrderFullInfo(orderId ?? '', {
    enabled: !!orderId,
  });

  const renderContent = (info: OrderFullInfo | undefined) => {
    if (!info) {
      return null;
    }

    const {
      id,
      startDate,
      endDate,
      orderType,
      choice,
      requested_items_quantity,
      executed_items_quantity,
      requested_max_inv,
      executed_max_inv,
      investment,
      invested,
      current_value,
      live_profit,
      auto_cancel,
      stop_loss,
      take_profit,
      price,
      slippage,
      selling_price,
      potential_profit,
      avg_exit_price,
      unfilled,
      matched_quantity,
      matching,
      profit,
      cancelled,
    } = info;

    return (
      <>
        <Header title={`Details of order ${id}`} mb={2} />

        <Box display="flex" gap={4} flexWrap="wrap">
          <CardBox {...cardBoxCommonProps}>
            <Item
              label={<PrimaryLabel label="Common info" />}
              value={null}
              paddingLeft={0}
              isExpandable={false}
              isListExpandable={false}
            >
              <Item
                label={<SecondaryLabel label="Start date" />}
                value={
                  <StringValue
                    value={format(startDate, DATETIME_FORMAT)}
                    isPrimary={false}
                  />
                }
                paddingLeft={2}
                isListExpandable={false}
              />
              <Item
                label={<SecondaryLabel label="End date" />}
                value={
                  <StringValue
                    value={format(endDate, DATETIME_FORMAT)}
                    isPrimary={false}
                  />
                }
                paddingLeft={2}
                isListExpandable={false}
              />
            </Item>

            <Divider />

            <Item
              label={<SecondaryLabel label="Order type" />}
              value={<StringValue value={orderType} isPrimary={false} />}
              paddingLeft={2}
              isListExpandable={false}
            />

            <Item
              label={<SecondaryLabel label="Selected side" />}
              value={
                <StringValue value={capitalize(choice)} isPrimary={true} />
              }
              paddingLeft={2}
              isListExpandable={false}
            />

            <Divider />

            <Item
              label={<SecondaryLabel label="Requested items" />}
              value={
                <NumberValue
                  value={requested_items_quantity}
                  isPrimary={false}
                  isCurrency={false}
                />
              }
              paddingLeft={2}
              isListExpandable={false}
            />

            <Item
              label={<SecondaryLabel label="Executed items" />}
              value={
                <NumberValue
                  value={executed_items_quantity}
                  isPrimary={false}
                  isCurrency={false}
                />
              }
              paddingLeft={2}
              isListExpandable={false}
            />

            <Divider />

            <Item
              label={<SecondaryLabel label="Requested Max Inv" />}
              value={
                <NumberValue
                  value={requested_max_inv}
                  isPrimary={false}
                  isCurrency={false}
                />
              }
              paddingLeft={2}
              isListExpandable={false}
            />

            <Item
              label={<SecondaryLabel label="Executed Max Inv" />}
              value={
                <NumberValue
                  value={executed_max_inv}
                  isPrimary={false}
                  isCurrency={false}
                />
              }
              paddingLeft={2}
              isListExpandable={false}
            />
          </CardBox>

          <CardBox {...cardBoxCommonProps}>
            <Item
              label={<SecondaryLabel label="Investment" />}
              value={<NumberValue value={investment} isPrimary={false} />}
              paddingLeft={2}
              isListExpandable={false}
            />

            <Item
              label={<SecondaryLabel label="Invested" />}
              value={<NumberValue value={invested} isPrimary={false} />}
              paddingLeft={2}
              isListExpandable={false}
            />

            <Divider />

            <Item
              label={<SecondaryLabel label="Current value" />}
              value={<NumberValue value={current_value} isPrimary={false} />}
              paddingLeft={2}
              isListExpandable={false}
            />

            <Item
              label={<SecondaryLabel label="Live profit" />}
              value={<NumberValue value={live_profit} isPrimary={true} />}
              paddingLeft={2}
              isListExpandable={false}
            />

            <Item
              label={<SecondaryLabel label="Potential profit" />}
              value={<NumberValue value={potential_profit} isPrimary={false} />}
              paddingLeft={2}
              isListExpandable={false}
            />

            <Item
              label={<SecondaryLabel label="Profit" />}
              value={<NumberValue value={profit} isPrimary={false} />}
              paddingLeft={2}
              isListExpandable={false}
            />

            <Divider />

            {auto_cancel && (
              <>
                <Item
                  label={<PrimaryLabel label="Auto-cancel" />}
                  value={null}
                  paddingLeft={0}
                  isExpandable={false}
                  isListExpandable={false}
                >
                  <Item
                    label={<SecondaryLabel label="Timeout" />}
                    value={
                      <StringValue
                        value={format(auto_cancel.timeoutAt, DATETIME_FORMAT)}
                        isPrimary={false}
                      />
                    }
                    paddingLeft={2}
                    isListExpandable={false}
                  />
                  <Item
                    label={<SecondaryLabel label="Status" />}
                    value={
                      <StringValue
                        value={auto_cancel.status}
                        isPrimary={false}
                      />
                    }
                    paddingLeft={2}
                    isListExpandable={false}
                  />
                </Item>

                <Divider />
              </>
            )}

            {stop_loss && (
              <>
                <Item
                  label={<PrimaryLabel label="Stop loss" />}
                  value={null}
                  paddingLeft={0}
                  isExpandable={false}
                  isListExpandable={false}
                >
                  <Item
                    label={<SecondaryLabel label="Trigger" />}
                    value={
                      <StringValue
                        value={stop_loss.triggerType}
                        isPrimary={false}
                      />
                    }
                    paddingLeft={2}
                    isListExpandable={false}
                  />
                  <Item
                    label={<SecondaryLabel label="Price" />}
                    value={
                      <NumberValue value={stop_loss.price} isPrimary={false} />
                    }
                    paddingLeft={2}
                    isListExpandable={false}
                  />
                  <Item
                    label={<SecondaryLabel label="Status" />}
                    value={
                      <StringValue value={stop_loss.status} isPrimary={false} />
                    }
                    paddingLeft={2}
                    isListExpandable={false}
                  />
                </Item>

                <Divider />
              </>
            )}

            {take_profit && (
              <>
                <Item
                  label={<PrimaryLabel label="Take profit" />}
                  value={null}
                  paddingLeft={0}
                  isExpandable={false}
                  isListExpandable={false}
                >
                  <Item
                    label={<SecondaryLabel label="Trigger" />}
                    value={
                      <StringValue
                        value={take_profit.triggerType}
                        isPrimary={false}
                      />
                    }
                    paddingLeft={2}
                    isListExpandable={false}
                  />
                  <Item
                    label={<SecondaryLabel label="Price" />}
                    value={
                      <NumberValue
                        value={take_profit.price}
                        isPrimary={false}
                      />
                    }
                    paddingLeft={2}
                    isListExpandable={false}
                  />
                  <Item
                    label={<SecondaryLabel label="Status" />}
                    value={
                      <StringValue
                        value={take_profit.status}
                        isPrimary={false}
                      />
                    }
                    paddingLeft={2}
                    isListExpandable={false}
                  />
                </Item>
              </>
            )}
          </CardBox>

          <CardBox {...cardBoxCommonProps}>
            <Item
              label={<SecondaryLabel label="Price" />}
              value={<NumberValue value={price} isPrimary={true} />}
              paddingLeft={2}
              isListExpandable={false}
            />
            <Item
              label={<SecondaryLabel label="Slippage" />}
              value={<NumberValue value={slippage} isPrimary={false} />}
              paddingLeft={2}
              isListExpandable={false}
            />
            <Item
              label={<SecondaryLabel label="Selling price" />}
              value={<NumberValue value={selling_price} isPrimary={false} />}
              paddingLeft={2}
              isListExpandable={false}
            />
            <Item
              label={<SecondaryLabel label="Average exit price" />}
              value={<NumberValue value={avg_exit_price} isPrimary={false} />}
              paddingLeft={2}
              isListExpandable={false}
            />

            <Divider />

            {isNil(unfilled) ? null : (
              <Item
                label={<SecondaryLabel label="Unfilled" />}
                value={<NumberValue value={unfilled} isPrimary={false} />}
                paddingLeft={2}
                isListExpandable={false}
              />
            )}

            <Item
              label={<SecondaryLabel label="Matched items" />}
              value={
                <NumberValue
                  value={matched_quantity}
                  isPrimary={false}
                  isCurrency={false}
                />
              }
              paddingLeft={2}
              isListExpandable={false}
            />

            {isNil(matching) ? null : (
              <Item
                label={<SecondaryLabel label="Matching" />}
                value={<StringValue value={matching} isPrimary={false} />}
                paddingLeft={2}
                isListExpandable={false}
              />
            )}

            {isNil(cancelled) ? null : (
              <Item
                label={<SecondaryLabel label="cancelled" />}
                value={<StringValue value={cancelled} isPrimary={false} />}
                paddingLeft={2}
                isListExpandable={false}
              />
            )}
          </CardBox>
        </Box>
      </>
    );
  };

  return (
    <BaseWidgetLayout isPending={isPending} error={error}>
      {renderContent(data)}
    </BaseWidgetLayout>
  );
};
