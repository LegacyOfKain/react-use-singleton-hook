import { singletonHook } from "./singletonHook";

export { singletonHook as useSingletonGlobalState };

const ReactSingletonHook = {
  useSingletonGlobalState: singletonHook,
};

export default ReactSingletonHook;
