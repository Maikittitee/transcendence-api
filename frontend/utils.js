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

export async function handle_42Redirect()
{
    let is_oauthRedirectInProgress = sessionStorage.getItem('oauthRedirectInProgress');
    if (is_oauthRedirectInProgress == null)
        return ;
    const oauthCode = getOauthCode();
    const res = await sendOauthCodeToBackEnd(oauthCode);
    setCookie("access", 7, res.tokens.access);
    setCookie("refresh", 7, res.tokens.refresh);
    window.Router.navigate('/game-menu-page/');
    sessionStorage.removeItem('oauthRedirectInProgress');
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

export async function fetchData(endpoint, body, method = 'GET', is_reqauth = true, header = { 'Content-Type': 'application/json' }, baseUri = 'http://localhost:9000/') {
  const access = getCookie("access") || '';

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
    if (error.status && error.body) {
      console.error(`HTTP Error ${error.status}:`, error.body);
      throw error;
    } else {
      console.error('Unexpected fetch error:', error);
      throw new Error('Unexpected fetch error');
    }
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

