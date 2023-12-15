export class MQTTTest extends tables.MQTTTest {
  subscribe(options) {
    if (options) options.omitCurrent = true;
    else options = { omitCurrent: true };
    return super.subscribe(options);
  }
}
