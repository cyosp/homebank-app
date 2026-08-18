import {Injectable} from "@angular/core";
import {createClient} from "webdav";
import {BufferLike, ResponseDataDetailed, WebDAVClient} from "webdav/dist/node/types";

@Injectable()
export class WebdavService {
  private webDavClient: WebDAVClient;
  private url: URL | null;

  constructor() {
    this.webDavClient = createClient("", {});
    this.url = null;
  }

  getResource(url: URL, login: string, password: string): Promise<BufferLike | string | ResponseDataDetailed<BufferLike | string>> {
    this.url = url;
    this.webDavClient = createClient(this.url.protocol + "//" + this.url.host, {
      username: login,
      password: password
    });

    return this.webDavClient.getFileContents(this.url.pathname, {format: "text"});
  }

  save(content: string): Promise<boolean> {
    return this.webDavClient.putFileContents(this.url!.pathname, content);
  }
}
