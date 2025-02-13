export function getCookie(CookieName)
{
  let keyName = CookieName + "=";
  let cookieArray = document.cookie.split('; ');
  let targetCookie = cookieArray.find((cookie) => cookie.indexOf(keyName) === 0);
  if (targetCookie != null)
    return (decodeURIComponent(targetCookie.substring(keyName.length)));
  else
    return null;
}

export function	setCookie(name, day, value, path = "/")
{
	let date = new Date(Date.now() + day * 24 * 60 * 60 * 1000).toUTCString();
	value = encodeURIComponent(value);
	document.cookie = `${name}=${value}; expires=${date}; path=${path};`;
}

export function deleteCookie(name, path = "/") {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path};`;
}

export function removeAllCookies() {
  let cookies = document.cookie.split("; ");

  for (let cookie of cookies) {
    let [name] = cookie.split("="); 
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  }
}

async function sendOauthCodeToBackEnd(oauthCode) {
  const oauthToBackEndPath = `http://localhost:9000/auth/callback/`;
  console.log("Sending OAuth code to backend: ", oauthCode);

  try {
      const requestHeader = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json', // Specify content type
          },
          body: JSON.stringify({ code: oauthCode }), // Pass code in body
          redirect: 'manual',
      };

      const response = await fetch(oauthToBackEndPath, requestHeader);
        console.log('sendOauthCodeToBackEnd response')
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`, requestHeader);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error sending OAuth code to backend:', error);
        sessionStorage.removeItem('oauthRedirectInProgress');
        window.Router.navigate('');
        throw error;
    }
}

function getOauthCode()
{
    const urlParams = new URLSearchParams(window.location.search);
    const oauthCode = urlParams.get('code');
    console.log("oauthCode: " + oauthCode);
    return  oauthCode;
}

export async function fetchData(endpoint, body, method = 'GET', is_reqauth = true, header = { 'Content-Type': 'application/json' }, baseUri = `https://${window.location.host}/api`) {
	console.log(`fetchData...on  ${baseUri} + ${endpoint}`)
	let access = getCookie("access") || '';
  // sessionStorage.setItem('test', true);
  // const test = sessionStorage.getItem('test');
  // if (test)
  // {
  //   console.log('edit access token');
  //   access = access + 'a';
  //   sessionStorage.removeItem('test');
  // }
  if (is_reqauth) {
    header['Authorization'] = `Bearer ${access}`;
  }
  const url = baseUri + endpoint;
  const options = {
    method,
    headers: { ...header },
  };

  if (method !== 'GET' && method !== 'HEAD' && body) {
    options.body = header['Content-Type'] === 'application/json'
      ? JSON.stringify(body)
      : body;
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = response.headers.get('Content-Type')?.includes('application/json')
        ? await parseResponse(response)
        : await response.text();
      throw { status: response.status, body: errorData };
    }

    // เช็คประเภทข้อมูลที่ตอบกลับมาเป็นไฟล์ เช่น รูปภาพ
    if (response.headers.get("Content-Type")?.includes("image")) {
      return response;  // คืนค่าคำตอบที่เป็น Response เพื่อใช้ .blob()
    }

    return await parseResponse(response); // ถ้าไม่ใช่ไฟล์ให้แปลงเป็น JSON
  } catch (error) {
    if (error.status === 401) 
    {
      await refresh_token_handle();
      await fetchData(endpoint, body, method, is_reqauth, header, baseUri);
    }
    else if (error.status && error.body) {
      console.error(`HTTP Error ${error.status}:`, error.body);
      throw error;
    } else {
      console.error('Unexpected fetch error:', error);
      throw new Error('Unexpected fetch error');
    }
  }
}

async function refresh_token_handle() {
  const refreshToken = getCookie('refresh');

  if (!refreshToken) {
    console.error('No refresh token found');
    return;
  }

  try {
    // ทำการขอ access token ใหม่โดยใช้ refresh token
    const response = await fetchData('/auth/token/refresh/', {
      refresh: refreshToken,
    }, 'POST', false, { 'Content-Type': 'application/json' });

    // ถ้าสำเร็จ จะได้รับ access token ใหม่
    if (response && response.access) {
      // เก็บ access token ใหม่ในคุกกี้
      setCookie('access', 1, response.access);  // สมมุติว่า access token จะหมดอายุใน 1 วัน
      console.log('New access token received:', response.access);
    } else {
      console.error('Failed to refresh token');
    }
  } catch (error) {
    console.error('Error refreshing token:', error);

    // หาก refresh token หมดอายุ หรือตรวจพบข้อผิดพลาดอื่นๆ ให้ลบคุกกี้ทั้งหมด
    deleteCookie('access');
    deleteCookie('refresh');
    alert('Session expired. Please log in again.');

    // สามารถ redirect ไปที่หน้า login หรือทำการ logout อื่นๆ ได้ที่นี่
    window.Router.navigate('/home-page/');
  }
}

async function parseResponse(response) {
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  return await response.text();
}

export async function getProfileData(){
  const res = await fetchData('/auth/users/', null);
  return res[0];
}

export function sanitizeInput(input) {
  if (typeof input !== "string") return input; // ไม่ทำอะไรถ้าไม่ใช่ string
  const temp = document.createElement("div");
  temp.textContent = input;
  return temp.innerHTML;
}

export async function updateUserData(json_user_data) {
  if (!json_user_data)
  {
    json_user_data = await getProfileData();
  }
  for (const key in json_user_data) {
    if (json_user_data.hasOwnProperty(key)) {
      const sanitizedValue = sanitizeInput(json_user_data[key]);
      sessionStorage.setItem(key, JSON.stringify(sanitizedValue));
    }
  }

  const profile_img_url = await getValueFromSession("avatar_url");
  if (profile_img_url === null)
  {
      sessionStorage.setItem('profile_img', window.Images.getFile("1.png"));
  }
  else{
      const res = await fetchData(profile_img_url, null);
      if (res instanceof Response) {
      const blob = await res.blob();
      sessionStorage.setItem('profile_img', URL.createObjectURL(blob));
      } else {
      console.error('The response is not a valid image file.');
      }
  }
}

export function getValueFromSession(key) {
  const value = JSON.parse(sessionStorage.getItem(key));
  return value;
}

export async function pageLoadManager()
{
    let pageLoadIndex = sessionStorage.getItem('pageLoadIndex', "home");
    if (pageLoadIndex == "home")
    {
      Router.init();
    }
    else if (pageLoadIndex == "42_login")
    {
      const oauthCode = getOauthCode();
      const res = await sendOauthCodeToBackEnd(oauthCode);
      setCookie("access", 1, res.tokens.access);
      setCookie("refresh", 7, res.tokens.refresh);
      window.Router.redirect('/game-menu-page/');
      sessionStorage.removeItem('oauthRedirectInProgress');
    }
    else if (pageLoadIndex == "game")
    {
      window.Router.redirect('/game-menu-page/');
    }
}

export function errorDisplay(errorModal, error) {
  console.log(error);

  let errorMessages;

  if (typeof error.body.detail === "object" && error.body.detail !== null) {
      // กรณี error.body.detail เป็น object ที่มี key และ array เป็นค่า
      errorMessages = Object.entries(error.body.detail)
          .map(([key, messages]) => `${key}: ${Array.isArray(messages) ? messages.join(", ") : messages}`)
          .join("<br>");
  } else if (typeof error.body.detail === "string") {
      // กรณี error.body.detail เป็น string
      errorMessages = error.body.detail;
  } else {
      // กรณีที่ไม่รู้จักโครงสร้างข้อมูล
      errorMessages = "An unknown error occurred.";
  }

  errorModal.set_title_content("Invalid");
  errorModal.set_body_content(errorMessages);
  errorModal.openModal();
}


