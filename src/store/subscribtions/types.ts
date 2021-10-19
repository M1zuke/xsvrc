import { Action } from 'redux';

export type SubscriptionActionType = `subscriptions/${'add-subscription' | 'remove-subscription'}`;

export type SubscriptionAction<T extends SubscriptionActionType> = Action<T>;

export type AddSubscription = SubscriptionAction<'subscriptions/add-subscription'> & {
  id: string;
};

export type RemoveSubscription = SubscriptionAction<'subscriptions/remove-subscription'> & {
  id: string;
};

export type SubscriptionActions = AddSubscription | RemoveSubscription;
