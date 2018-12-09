import { Handler, Context, Callback } from 'aws-lambda';

interface RedirectResponse {
  status: number,
  statusDescription: string,
  headers: { location: { key: string, value: string }[] }
}

const isMobile: (request: any) => boolean = function (request: any): boolean {
  const { headers } = request;
  const mobile = headers['cloudfront-is-mobile-viewer'];
  const [confirm] = mobile && mobile;

  return confirm && confirm.value && confirm.value === 'true';
};

const skipEmptyEventLoop: (context: Context) => void = function (context: Context): void {
  context.callbackWaitsForEmptyEventLoop = false;
};

const getRequest: (records: any[]) => any = function (records: any[]): any {
  const [first] = records;
  return first.cf.request;
};

const forward: Handler = function (event: any, context: Context, callback: Callback) {
  skipEmptyEventLoop(context);

  console.log('forward: event', event);
  console.log('forward: context', context);

  const request = getRequest(event.Records);

  if (!isMobile(request)) {
    console.log('forward: response', request);
    callback(undefined, request);
    return;
  }

  const response: RedirectResponse = {
    status: 302,
    statusDescription: 'mobile',
    headers: { location: [{ key: 'Location', value: `https://m.alertbox.com${request.uri}` }] }
  };

  console.log('forward mobile: response', response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
  callback(undefined, response);
};

export { forward }