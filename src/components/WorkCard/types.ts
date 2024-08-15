import { Button } from "../Button";

export type FileProps = {
  url: string;
  className?: string;
};

export type FileRendererProps = {
  fileAccessLink: {
    accessType: string;
    url: string;
    mimeType: string;
  }
};

export type LikeCountProps = {
  count: number;
  className?: string;
  iconClassName?: string;
};

export type SubtitleProps = {
  subtitle: string;
  className?: string;
};

export type TitleProps = {
  title: string;
  className?: string;
};

export type ButtonWrapProps = {
  children: React.ReactNode;
  isLiked: boolean;
  iconClassName?: string;
} & React.ComponentProps<typeof Button>;
