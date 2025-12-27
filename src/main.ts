import { singletonHook } from "./singletonHook";

export { singletonHook as createSingletonStateHook };

const ReactSingletonHook = {
  //This Generic Arrow Function is creating a hook, not calling one, so naming convention should not have use prefix
  createSingletonStateHook: singletonHook,
};

export default ReactSingletonHook;
