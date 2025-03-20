import { FC } from 'react';
import { DescriptionListProps } from './types';

export const DescriptionList: FC<DescriptionListProps> = ({ items }) => (
  <ul className='m-0 pl-4 text-black list-decimal text-base/[22px]'>
    {items.map((item, index) => (
      Array.isArray(item) ? (
        <ul key={index} className='pl-4'>
          {item.map((subItem, subIndex) => (
            <li key={subIndex} className='mb-2'>{subItem}</li>
          ))}
        </ul>
      ) : (
        <li key={index} className='mb-2'>{item}</li>
      )
    ))}
  </ul>
);