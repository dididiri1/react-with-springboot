interface PageParam {
  page?: string | number;
  size?: string | number;
}

interface UseCustomMoveReturn {
  moveToList: (PageParam?: PageParam) => void;
  moveToModify: (tno: number) => void;
  moveToRead: (tno: number) => void;
  page: number;
  size: number;
  refresh: boolean;
}

interface PageReqeustDto {
  page: number;
  size: number;
}

interface PageResponseDTO<T> {
  dtoList: T[]; // 데이터 목록 (제네릭 타입)
  pageNumList: number[]; // 페이지 번호 목록
  pageRequestDTO: PageRequestDTO | null; // 요청에 사용된 페이지 정보
  prev: boolean; // 이전 페이지 존재 여부
  next: boolean; // 다음 페이지 존재 여부
  totalCount: number; // 전체 항목 수
  prevPage: number; // 이전 페이지 번호
  nextPage: number; // 다음 페이지 번호
  totalPage: number; // 전체 페이지 수
  current: number; // 현재 페이지 번호
}

interface TodoAdd {
  title: string;
  writer: string;
  dueDate: string;
}

interface ResultModal {
  title: string;
  content: string;
  callbackFn?: () => void;
}
