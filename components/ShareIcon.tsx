"use client";

import { FacebookIcon, FacebookShareButton, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, LinkedinIcon, LinkedinShareButton, RedditIcon, RedditShareButton } from 'next-share';
import { FC } from 'react';

interface Props {
  url: string;
  hashtag?: string;
  quote?: string;
}

const ShareIcon = ({ url, hashtag, quote }: Props) => {
  return <div className='flex md:flex-col md:items-start items-center order-2 md:order-1 mr-8 mb-4'>
    <p className='font-semibold text-primary dark:text-primary mr-2 m md:mr-0'>Share:</p>

    <div className="flex items-center gap-2">
      <FacebookShareButton url={url} hashtag={`#${hashtag}`} quote={quote}>
        <FacebookIcon size={32} borderRadius={8} />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={quote} hashtags={[`#${hashtag}`]}>
        <TwitterIcon size={32} borderRadius={8} />
      </TwitterShareButton>

      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} borderRadius={8} />
      </LinkedinShareButton>

      <WhatsappShareButton url={url} separator=' : ' title={quote}>
        <WhatsappIcon size={32} borderRadius={8} />
      </WhatsappShareButton>
    </div>
  </div>;
};

export default ShareIcon;