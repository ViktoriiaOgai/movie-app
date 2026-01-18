import { Pagination } from 'antd';
import '../app/globals.css'

type Props = {
  current: number;
  totalPages: number;
  onChange: ( page: number) => void;
};

const PAGE_SIZE = 6;

export default function PaginationComponent({ current, totalPages, onChange }: Props) {
  return (
    <div className="flex justify-center mx-auto py-12 text-[rgba(0,0,0,0.65)] text-xs">
    <Pagination 
      current={current}
      total={totalPages}
      pageSize={PAGE_SIZE}//количество элементов на одной странице
      onChange={onChange}
      showSizeChanger={false} // убирает выбор количества элементов на странице
      showLessItems={true} //делает пагинацию компактнее при большом числе страниц

    />
    </div>
  );
}
