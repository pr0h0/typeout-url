interface TypeoutUrlConfig {
  get?(url: string, options?: any): Promise<any>;
  post?(url: string, body: any, options?: any): Promise<any>;
  put?(url: string, body: any, options?: any): Promise<any>;
  delete?(url: string, options?: any): Promise<any>;
  patch?(url: string, body: any, options?: any): Promise<any>;
  head?(url: string, options?: any): Promise<any>;
  options?(url: string, options?: any): Promise<any>;
  trace?(url: string, options?: any): Promise<any>;
  connect?(url: string, options?: any): Promise<any>;
}

interface Client {
  $reset(): string[];
  $append(path: string): void;
  $getURL(): string;
  send(method: string, body: any, options: any): Promise<any>;
  $s: Client;
  $2s: Client;
  $c: Client;
  $q: Client;
  $h: Client;
  $at: Client;
  $dot: Client;
  $u: Client;
  $d: Client;
  $eq: Client;
  $amp: Client;
  $get: Function;
  $post: Function;
  $put: Function;
  $delete: Function;
  $patch: Function;
  $head: Function;
  $options: Function;
  $trace: Function;
  $connect: Function;
  [key: string]: Client;
  call: Function;
}
