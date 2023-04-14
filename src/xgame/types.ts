import { ActionFunctionMap, EventObject, ActionFunction, ActionObject } from 'xstate';
import { PlainGameState } from '../store/Game/Game.types';


export type CustomActionObject<TContext, TEvent extends EventObject> = {
  type: string
  exec: ActionFunction<TContext, TEvent>
} & ActionObject<TContext, TEvent>


export type GameActions = ActionFunctionMap<PlainGameState, EventObject>;
