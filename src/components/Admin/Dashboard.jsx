import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import React, { useEffect, useState } from 'react';
import '../Admin/Dashboardtyle.css';
import BottomBar from '../Template parts/BottomBar';
import { useNavigate, useLocation } from "react-router-dom";


function Dashboard() {

  const MINUTES_BEFORE_EXPIRATION = 10 //מחליף טוקן 10 דקות לפני שפג תוקף
  const INTERVAL_TIME = 3000; ///בודק טוקן כל שלושים שניות


  const navigate = useNavigate();
  const [tokenExpiration, setTokenExpiration] = useState(null);

  useEffect(() => {
    // Set an interval to check the access token expiration, and update if needed
    const interval = setInterval(() => checkTokenAndUpdate(), INTERVAL_TIME);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const checkTokenAndUpdate = async () => {
    if (!tokenExpiration) return;

    // Get the current time    
    const currentTime = Date.now();
    const expiration = Date.parse(tokenExpiration);

    // Time until token expiration in milliseconds
    const timeUntilExpiration = expiration - currentTime;
    const timeToUpdate = MINUTES_BEFORE_EXPIRATION * 60 * 1000;

    if (timeUntilExpiration <= timeToUpdate) {
      console.log("Updating report access token");
      await updateToken();
    }
  };

  const updateToken = async () => {
    // Generate a new embed token or refresh the user Azure AD access token
    const newAccessToken = await getNewUserAccessToken();

    // Update the new token expiration time
    setTokenExpiration(newAccessToken.expiration);

    // Set the new access token
    await window.report.setAccessToken(newAccessToken.tokenId);
  };

  const getNewUserAccessToken = async () => {
    const endpoint = 'https://api.powerbi.com/v1.0/myorg/groups/7c90b420-6a68-429c-8eb8-6f35592e42a0/reports/7ddf046d-220c-4431-b410-f636b375cce9/GenerateToken'; // Power BI API endpoint
    const requestBody = {
      // datasets: [{ id: 'dc12d781-cb80-4ac2-9f9b-9d8310181bdd' }],
      // reports: [{ id: '7ddf046d-220c-4431-b410-f636b375cce9' }]
      accessLevel: "View",
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const data = await response.json();
        return {
          token: data.token,
          expiration: data.expiration,
          tokenId:data.tokenId
        };
      } else {
        throw new Error('Failed to generate access token');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };



  const Go2AdminHome = () => {
    navigate("/admin", { state: "admin@gmail.com" })
  }


  return (
    <div className="Embed-container">
      <div className='items-div'>
        <p>ניתוחים כללים</p>
        {/* copy token from inspect */}
        {/* id from the url */}
        <PowerBIEmbed
          embedConfig={{
            type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            id: "7ddf046d-220c-4431-b410-f636b375cce9",
            embedUrl: "https://app.powerbi.com/reportEmbed?reportId=7ddf046d-220c-4431-b410-f636b375cce9&groupId=7c90b420-6a68-429c-8eb8-6f35592e42a0&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d", accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMGZmMDM4ODAtNGQ3NS00ZDc2LTg4OWEtMjY3NjAzNzBmY2QzLyIsImlhdCI6MTY4OTUxNjEwMSwibmJmIjoxNjg5NTE2MTAxLCJleHAiOjE2ODk1MjAxNzcsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUF1dFJMd1VibFBpZTRsL3E0ZzZtam82Snl0Z3RubEhyV21WbjROTXdCQWdoRGlnd2JKd3VVSjB5WlpaUmszTTRuIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoi15HXqCIsImdpdmVuX25hbWUiOiLXkdeoIiwiaXBhZGRyIjoiMmEwNjpjNzAxOjQzMjM6YzMwMDozOWUyOmFhNWM6ZGVhMDpkY2FmIiwibmFtZSI6IteR16gg15HXqCIsIm9pZCI6IjEzNTQ2ZDliLTg2ODItNDA2MS1iMWJmLTg0NjkxYTIyOGZjMCIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0xODU2NDgxMzQyLTQxNjg4NDAzOTUtMzc5ODcwOTE5Ni01MjgyOSIsInB1aWQiOiIxMDAzMjAwMEJEMDcwRjAzIiwicmgiOiIwLkFRc0FnRGp3RDNWTmRrMkltaVoyQTNEODB3a0FBQUFBQUFBQXdBQUFBQUFBQUFDRUFNMC4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJMbHFIZE1hNFZmYVJiV1ZNTGc2UE93dGNyZktFa2twX3BkeWlsdy1fREdJIiwidGlkIjoiMGZmMDM4ODAtNGQ3NS00ZDc2LTg4OWEtMjY3NjAzNzBmY2QzIiwidW5pcXVlX25hbWUiOiJyb3RlbWJhdC5iYXJAcnVwcGluMzY1Lm5ldCIsInVwbiI6InJvdGVtYmF0LmJhckBydXBwaW4zNjUubmV0IiwidXRpIjoiTWdkYUpSZG5Ja2ltaFV0djM5RVBBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.ggtOBxIADNdptZYXfqsUvQzTi7Fei5hSB65i7PQ5sig9RToSugOJQFCujTwNfUGXhURR2v2ahu6-t8zM3iAqMO3E2RWvaWNMv8SO6uqQveua57ASXNe2j0HFbEfvG4x2aEhkSgPpCdnpq7lVKKFbZTNCLiRdm2fYryc8J0PjpIl1uyMzDohFNb31TdN6RafJHIh4DPBeeTlnWHyU8hlniO81fQzw-VOOtXLejVlD90o8IzRwBkfT_noifk6cVbASO2ubzJ24H-gRRyGiDPnZeT4ZQTv1uOUKUTHZQZ5kiGvuuFTS9ETLxJf5AQxNrAAep6avzMEMGUnJsgZD683J1Q',
            // accessToken: "H4sIAAAAAAAEACWWxQ70CA6E3-W_ZqUwrTSHMDPnFuykwwyjffdtzdwtWS7bVd_ff-zs6aes_PPfPzrewEoNl3KikOc5j4J4y2frE_HIkrLIc2v4WrICCPkZoh3smkP-IgzDlVDi10v5XPVdRPJRaOWt-MpsE5_1VlafNOd3ysDK2u6Un-9O6uksWVhZjgfFpLOcgUEKElzU0UEwjHAsdQkI4ndUHsp064idHCMhu_eKFbYDDJiz3fiqhKSYsyYvKxpsmz1rI_J6RS_GsB5hWAt4ajgHus_xyd8QS6B5Oigc0zdHbmRmlw9c_vjmp_DhpBvOqCHwtGsE3b0ZpgtsQpw9KED605Cme4kTSENNSBgyn9NaNG8_ivUtJtnKx-2aPq2RHHdjtKYpJt1e5ngWRY0Xt4d3ksUx29qnb75wEe0gypKSeF8YJc2fABl7I-soR9TGKlJinaaXJJg95YvwOmXOoq3aeRLHPuK4EKe-KHCt_K5_y2rQ6eTk-oItWbY_TWhHnY0r1K2MULqGULyKAqQIklsXRre3BMuINsHNayUuXV8TTSjTUCxvAu1Skvrdus2CNcjScNutgZRnniu_e5LXYoZWyKCCljy0SL5iO5TgzmAa8mRGsIHuTz8gNQh90Mo4X1E4nI-YI_18-ItuJYVVJs6Lk8_hCdEy6qSxIgMXpB5DcmBJgmi_tsCaIQd6gt2xajB75NwNsKuepyTNpE0gmBMSV_jTePLvfqYCoJJ6-H4reCqdO4OY6l40quIb5DKiYO3C7obxTm-RzKZT0YOzhnXSqqX5dze9YSzXNRnKCtqonHaGKy1ExVU-28VtpExHBdip7IilTHF2CWfozuSsyBFiBa-gyqwRq-1evuJnmjGtDAJT76kJ3a1YQCyzfP7wWgPsln1ubGkn2PVqx44iwiR5QX0OHCZ793wbjDNUgOUV4kszRzqqnrB26SdrjIr-bTBW_Zk67-zuUScUHWiluGIHP2k_9DtM6gxRg2Swf64r5gybseci2Q_znnB3MqkW89VxbycptTD-hsdGfyAtJmV1CrGvzIM7phgLjDlHXrMTXJAGhbxmdiC2yUwXnmkwbRcTYJdRC8wou9JEdwhelvhAqAYBxZyXnPuHFVYZCTDvRX9l-uvawjSDllqzJVQIV95-4dOTd2WAv7WjvuQnokQG1dsRuJu2WyWsb7fQ7moKE2c5drYSr19AP2KUsMpO8UROKjCuPwgHy5P2PWUqjfB1qL4PrQTxpzLrY1wr6Du-6JRMaYbtNQs42uptE_idf48nzG_tiLJKOhUGa9WeYDEfkoB4x3c9XwcNzi3akxP54QzAoRi1PEU99XhvOWrNnS9nRCxLh4YmwqvFPb3LHrWgZ4kcLkxPtRT4cauHQwCxFOWkT1g0YXiGVMFTZW7hd9_LLnn6BID2JvH9W_NlG5HVGVM_Kwqf09pegqRTu-3D8xDwUa6aUVF0OgW0musfY5IVVbhm51U0ZJAVjuO-qIA0-RCTGS6jaKUa1Ml2lxDRKkbGy8Mr-0AtpTMSGQaE6SvtCgWGRmp7uHoK9RfauKX9GSfieknK1e6qo0UveiWl40DNksfVXNMD81dB62s4TO5VwJX9LGc786shCEhfDxfK3Lux46w8vLFTIdKncZGoAR0VgndtMh_eQt3hJZkMOof-pPhzMpySbEPNd2FlT9Mdo5hbdba4AGWcEXlwg-DV5VWefwot4q2bpXa0QTw-M1Qk_rVugz63Ss3IcS1kmlguKMDa9MJjFGaVIoWlgyzfxUrRAF1fRN0vC6OQgGeC7uBuercjdX4OXOABhu1a6JHXBRAu9Y8H-9NchxNmSxhQ7XYfqmp2GEmnpPGHI1BVL-Get1zt29tKzqSHKnwC_aQoAJDNrmE1Q6VcGvI3Ocr5WVBex9rTCJpD4LF0BZG3AC2HjpoSVfleRwBJoPbSpoeMdqGvM-AqVrp2vbEac2hbWyVJPW60FRPVSoQHrj9J2wF5bgvvDu4dGAwsu1UdUv0hL3EaTGwD38RjbEv-LJ14T2h43uQ-bzCsiUiZLGhexmr55f2b_JwNQJ8ZUe9tEXrOLwPg31P0Jg-7aVg78eb5Zn9suWfp0UG5by0W6h3Ojeb5OkXyRJIXsLe9cQ3spiognaS_GUU1Txg88JVNPX50hGOT6dVD7QWUYMZKwUCOagnfYTUw8mKq10lIBjbXaM0-o_Gai2DnZqvBmP_LXJ7Z0ZQAOqR4r-0FXom2qOX5VE1gIplB6s5u3ZuzOWG-jXgKwvK3FxykUPHWoHnCbUuzklGg1OLGTqE8S83wItxYQWujl5i0sxQHdmXwxWF8vv3q0Z51JXEzdS9P4eLAVK2RNUn6WAMvNIzhqd-CmT7inbwJRuAzrgvc4JaUQZQrEgjOYL00hwh1yiSfjn8Z4CM_xK0iPFe17wrXcMV8XbhW7_UwAHIyPs3om8GldyXNxJZOfiwU5ACaBnzhxRbGcdHunKSRra3XbVcx5VdPvFKIlVhfEpeTmS1YmJZej-8sGJYBq270RBMR7scCBkbKeOnm9Iu7T6-XSQY8WFaF9ljLKYPLtOc4C99lKvfcPaTVoU1yNdeBVQEnYk2_sNtB4bsm39sVkEb6yDfeClmqCtSlvVGsouQkGx-VcYI8zOP-mxt8BTCs0LZEs9v-tTUQu8Ooh61M8DQuKRpQYAane07-SyMttTpGoPMtucF93wBwqroLKYhOub6nHpxmvYuCq3CWtZlha43JTMD3smc3iR2tLR9rqybZkmfaZxtHGiuxrVxQKBMF4gFS6ocIIpxG55c7oIgjXXDtZAV9fYo5yu6vP__5w63PvE9a9fzQdcJSeBlbM4ty--z15xe5mAxxyXbaEl0uIr1drFgOsERkbRRqvHX0VzyfXyRlUA_uCA1MmsmyCS8QMTllhAtNbYRGqut0HDEy_PQHNwEUL7xao98Y1OxGe5aEQ9whiFlwt73eQBBoAJ8cdvVdMgi-ypIuYLhPMaJQmskWue05qqhEfLKa438c4P1Gd9X8yOZs6jlmS_d7k7qs3j5YdCLs0fIUzndBqSbLpZcJyHT7-itM3w-Bm08pvXEAa7F_07h1gMPqR4mrlatpOX0oycdDdR463dOXEbVaQ65aGjk5wSJzXmTQhBvNMjycbDAGwl-aTQZIVGbebeOJSnW5wg6FWxvY-esfmZ-5qVYl_KmcmYA1Vbb57FxKgp_74DoF-rfKaz9jth9r9StrpKuO7BZkQ4Q_9S_jSzY62x2NQJnlO0Y1gw01GVKOeGm5YHwTA-sBhXeL6G4C7vn96RTOD4opjLRKfI-KfdiPEg6UG__m3Dd5jp3D-e7sj63QLocg_5JsjMfiTaWBr_NY9xMXoRUJ3DYSAJaW7cmSd5pB-jnr6TtMDe4wXbE23i9oxARwma_a5So2ercd4Xvh2ehHiV2ofXepf2ee-TLHdblklNcdlvA5GZ68nbFTWiDflxPNunczJWEHd4wwosx7CF8_9aVrJk3-PFPog6mugJmxf-hg0nD8Hf0coHk4xB5fjApIR0Zwq48h0B6SPKr9eUs74gwBew9b2AvQaybpCy3MT-b__R83c9GGrg0AAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZXhwIjoxNjg5NTIxMDk5LCJhbGxvd0FjY2Vzc092ZXJQdWJsaWNJbnRlcm5ldCI6dHJ1ZX0=",
            // tokenId: {tokenId},
            tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: true
                }
              },
              background: models.BackgroundType.Transparent,
            }
          }}

          eventHandlers={
            new Map([
              ['loaded', function () { console.log('Report loaded'); }],
              ['rendered', function () { console.log('Report rendered'); }],
              ['error', function (event) { console.log(event.detail); }],
              ['visualClicked', () => console.log('visual clicked')],
              ['pageChanged', (event) => console.log(event)],
            ])
          }

          cssClassName={"Embed-container"}

          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />
      </div>
      <BottomBar
        onHomeClick={Go2AdminHome}

      />
    </div>

  );

}


export default Dashboard;
