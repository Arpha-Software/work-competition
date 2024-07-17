import React, { useState } from 'react';
import cn from '@/tools/cn';

import { Button } from '../Button';

import IconLike from '/public/icons/icon-like.svg';
import IconLikeBlack from '/public/icons/icon-like-black.svg';

import type { ButtonWrapProps, FileProps, FileRendererProps, LikeCountProps, SubtitleProps, TitleProps } from './types';

type WorkCardProps = {
  children: React.ReactNode;
  className?: string;
};

const WorkCard = ({ children, className }: WorkCardProps) => {
  return (
    <div className={cn('bg-primary-50 h-full xl:max-w-96 w-full', className)}>
      {children}
    </div>
  );
};

const Image = ({ url, className }: FileProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleImageClick = () => {
    setIsFullScreen(true);
  };

  const handleCloseClick = () => {
    setIsFullScreen(false);
  };

  return (
    <>
      <img
        src={url}
        alt="work image"
        className={cn('w-full object-contain h-72 cursor-pointer', className)}
        onClick={handleImageClick}
      />
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-4 right-4 m-4 px-4 py-2 text-white bg-black hover:bg-opacity-80 bg-opacity-50 rounded-full transition-all"
              onClick={handleCloseClick}
            >
              &times;
            </button>
            <div className="flex items-center justify-center h-screen w-screen">
              <img
                src={url}
                alt="work image"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Video = ({ url, className }: FileProps) => {
  return (
    <video controls className={cn('w-full object-contain h-72', className)}>
      <source src={url} type="video/mp4" />
      Ваш браузер не підтримує відео тег.
    </video>
  );
};

const PDF = ({ url, className }: FileProps) => {
  return (
    <embed src={url} type="application/pdf" width="100%" height="288px" className={className} />
  );
};

const FileRenderer = ({ fileAccessLink }: FileRendererProps) => {
  const { url, mimeType } = fileAccessLink;

  if (mimeType.startsWith('image/')) {
    return <Image url={url} />;
  } else if (mimeType.startsWith('video/')) {
    return <Video url={url} />;
  } else if (mimeType === 'application/pdf') {
    return <PDF url={url} />;
  } else if (mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
    return (
      <a href={url} className='h-72'>
        <img src="/images/pptx_placeholder.png" alt="" className='h-72 w-full object-contain' />
      </a>
    );
  } else {
    return (
      <a href={url} className='h-72'>
        <img src="/images/file_placeholder.jpg" alt="" className='h-72 object-contain w-full'/>
      </a>
    );
  }
};

const LikeCount = ({ count, className, iconClassName }: LikeCountProps) => {
  return (
    <div className={cn('flex text-white gap-4 bg-primary w-full px-4 py-2 rounded group', className)}>
      <IconLike className={cn(iconClassName)} />

      <span>
        {count} Вподобань
      </span>
    </div>
  );
};

const Subtitle = ({ subtitle, className }: SubtitleProps) => {
  return (
    <div className={cn('uppercase', className)}>{subtitle}</div>
  );
};

const Title = ({ title, className }: TitleProps) => {
  return (
    <h3 className={cn('text-2xl font-semibold', className)}>
      {title}
    </h3>
  );
};

const ButtonWrap = ({ children, isLiked, iconClassName, ...props }: ButtonWrapProps) => {
  return (
    <Button {...props} className='flex items-center justify-center uppercase gap-4 font-semibold group'>
      <IconLikeBlack className={cn('group-hover:fill-black', isLiked ? 'fill-black' : '', iconClassName)} />

      {children}
    </Button>
  );
}

WorkCard.File = FileRenderer;
WorkCard.LikeCount = LikeCount;
WorkCard.Subtitle = Subtitle;
WorkCard.Title = Title;
WorkCard.ButtonWrap = ButtonWrap;

export default WorkCard;
