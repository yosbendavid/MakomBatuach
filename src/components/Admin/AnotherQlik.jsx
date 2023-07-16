import React, { useEffect } from 'react';

export default function AnotherQlik() {
  useEffect(() => {
    const TENANT = '6tos7pzl6xqjljz.sg.qlikcloud.com';
    const WEBINTEGRATIONID = 'wKd-HmE6KomrziGi1fTrBbdAhOQcODjy';
    const APPID = '<app-id>';
    const SHEETID = '<sheet-id>';
    const IDENTITY = '<identity>';

    (async function main() {
      const isLoggedIn = await qlikLogin();
      const qcsHeaders = await getQCSHeaders();
      const [session, enigmaApp] = await connectEnigma(qcsHeaders, APPID, IDENTITY);
      handleDisconnect(session);
      const theme = await getTheme(enigmaApp);
      renderSingleIframe('qlik_frame', APPID, SHEETID, theme, IDENTITY);
      const message = 'Session will be automatically closed in 10 seconds to showcase the handling.';
      document.getElementById('message').innerHTML = message;
      setTimeout(() => {
        session.close();
      }, 10000);
    })();

    async function qlikLogin() {
      const loggedIn = await fetch(`https://${TENANT}/api/v1/users/me`, {
        mode: 'cors',
        credentials: 'include',
        headers: {
          'qlik-web-integration-id': WEBINTEGRATIONID,
        },
      });

      if (loggedIn.status !== 200) {
        if (sessionStorage.getItem('tryQlikAuth') === null) {
          sessionStorage.setItem('tryQlikAuth', 1);
          window.location = `https://${TENANT}/login?qlik-web-integration-id=${WEBINTEGRATIONID}&returnto=${location.href}`;
          return await new Promise(resolve => setTimeout(resolve, 10000));
        } else {
          sessionStorage.removeItem('tryQlikAuth');
          const message = 'Third-party cookies are not enabled in your browser settings and/or browser mode.';
          alert(message);
          throw new Error(message);
        }
      }

      sessionStorage.removeItem('tryQlikAuth');
      console.log('Logged in!');
      return true;
    }

    async function getQCSHeaders() {
      const response = await fetch(`https://${TENANT}/api/v1/csrf-token`, {
        mode: 'cors',
        credentials: 'include',
        headers: {
          'qlik-web-integration-id': WEBINTEGRATIONID
        },
      });

      const csrfToken = new Map(response.headers).get('qlik-csrf-token');
      return {
        'qlik-web-integration-id': WEBINTEGRATIONID,
        'qlik-csrf-token': csrfToken,
      };
    }

    async function connectEnigma(qcsHeaders, appId, identity) {
      const [session, app] = await getEnigmaSessionAndApp(appId, qcsHeaders, identity);
      return [session, app];
    }

    async function getEnigmaSessionAndApp(appId, headers, identity) {
      const params = Object.keys(headers)
        .map((key) => `${key}=${headers[key]}`)
        .join('&');

      return (async () => {
        const schema = await (await fetch('https://unpkg.com/enigma.js@2.7.0/schemas/12.612.0.json')).json();

        try {
          return await createEnigmaAppSession(schema, appId, identity, params);
        } catch {
          const waitSecond = await new Promise(resolve => setTimeout(resolve, 1500));
          try {
            return await createEnigmaAppSession(schema, appId, identity, params);
          } catch (e) {
            throw new Error(e);
          }
        }
      })();
    }

    async function createEnigmaAppSession(schema, appId, identity, params) {
      const session = enigma.create({
        schema,
        url: `wss://${TENANT}/app/${appId}/identity/${identity}?${params}`
      });
      const enigmaGlobal = await session.open();
      const enigmaApp = await enigmaGlobal.openDoc(appId);
      return [session, enigmaApp];
    }

    async function getTheme(enigmaApp) {
      const createAppProps = await enigmaApp.createSessionObject({
        qInfo: {
          qId: "AppPropsList",
          qType: "AppPropsList"
        },
        qAppObjectListDef: {
          qType: "appprops",
          qData: {
            theme: "/theme"
          }
        }
      });

      const appProps = await enigmaApp.getObject('AppPropsList');
      const appPropsLayout = await appProps.getLayout();
      const theme = appPropsLayout.qAppObjectList.qItems[0].qData.theme;
      return theme;
    }

    function handleDisconnect(session) {
      session.on('closed', () => {
        const message = '<Your text here> Due to inactivity or loss of connection, this session has ended.';
        document.getElementById('qlik_frame').style.display = "none";
        document.getElementById('message').innerHTML = message;
      });

      session.on('suspended', () => {
        const message = '<Your text here> Due to loss of connection, this session has been suspended.';
        document.getElementById('qlik_frame').style.display = "none";
        document.getElementById('message').innerHTML = message;
      });

      window.addEventListener('offline', () => {
        session.close();
      });
    }

    function renderSingleIframe(frameId, appId, sheetId, theme, identity) {
      const frameUrl = `https://${TENANT}/single/?appid=${appId}&sheet=${sheetId}&theme=${theme}&identity=${identity}&opt=ctxmenu,currsel`;
      document.getElementById(frameId).setAttribute('src', frameUrl);
    }
  }, []);

  return (
    <div>
      <div id="main">
        <div id="message"></div>
        <iframe id='qlik_frame' style={{ border: 'none', width: '100%', height: '900px' }}></iframe>
      </div>
    </div>
  );
}
