import { Cookies } from "react-cookie";

const cookies = new Cookies();

/**
 * 쿠키 설정
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @param days 유지 기간 (일 수)
 */
export const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days); // 보관 기한
  return cookies.set(name, value, { path: "/", expires });
};

/**
 * 쿠키 가져오기
 * @param name 쿠키 이름
 */
export const getCookie = (name: string) => {
  return cookies.get(name);
};

/**
 * 쿠키 삭제
 * @param name 쿠키 이름
 * @param path 경로 (기본값 "/")
 */
export const removeCookie = (name: string, path = "/") => {
  cookies.remove(name, { path });
};
