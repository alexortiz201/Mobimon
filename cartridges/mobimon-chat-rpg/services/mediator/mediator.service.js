/**
 * subcribder factory returns
 * instantiated emitter.
 * @param  {Object} opts [description]
 * @return {[type]}      [description]
 */
const subscriberProto = {
  subscribe: function () {
    console.log('subbed');
  },
};

const createSubscriber = (opts = subscriberProto) => Object.assign({}, opts);

/**
 * emitter factory returns
 * instantiated emitter.
 * @param  {Object} opts [description]
 * @return {[type]}      [description]
 */
const emitterProto = {
  emit: function () {
    console.log('tada');
  },
};

const createEmitter = (opts = emitterProto) => Object.assign({}, opts);

const createCommunicator = (subscriber, emitter) =>
  () => {
    const subscribe = subscriber.subscribe;
    const emit = emitter.emit;

    return {
      subscribe,
      emit,
    };
  };

const mediatorConfigs = {
  communicator: createCommunicator(createSubscriber(), createCommunicator()),
};
const mediator = (opts = mediatorConfigs) => {
  const createChannel = (opts = {}) => {
    mediator[opts.channel] = ;
    return ;
  };

  return {
    createChannel,
  }
};

export default {
  mediator,
};
