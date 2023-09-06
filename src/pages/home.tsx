import { FC } from 'react';
import {PageDataInfo, PageDataSubInfo, PageGraphContents} from "./style"

const home: FC = () => {

  return (
    <>
        <PageDataInfo>
            <div className='items'>
                <div>시작일자:</div>
                <input />
            </div>

            <div className='items'>
                <div>종료일자:</div>
                <input />
            </div>

            <div className='items'>
                <div>카테고리:</div>
                <input />
            </div>

            <div className='items'>
                <div>키워드:</div>
                <input />
            </div>
        </PageDataInfo>
        <PageDataSubInfo>
            <div>
                timeUnit
            </div>    
            <div>
                age
            </div>
            <div>
                gender
            </div>
            <div>
                device
            </div>
            <button>
                조회
            </button>
        </PageDataSubInfo>
        <PageGraphContents>

        </PageGraphContents>
    </>
  );
}

export default home;