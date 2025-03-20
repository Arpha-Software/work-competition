import { FC } from 'react';
import { ContentSectionProps } from './types';

export const ContentSection: FC<ContentSectionProps> = ({ title, content }) => (
  <div className="mt-4">
    <h3 className="text-primary font-semibold text-sm lg:text-base">{title}</h3>
    <p className="mt-2 indent-8">{content}</p>
  </div>
); 