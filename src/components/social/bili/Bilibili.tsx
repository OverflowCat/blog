import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { BVtoAV, AVtoBV } from "bilibili-bv-av-convert";
import "./bili.less";

interface BilibiliProps {
  autoplay: boolean;
  thumbnail: string;
  av?: number;
  bv?: string;
}

const Bilibili: React.FC<BilibiliProps> = ({ autoplay, thumbnail, av, bv }) => {
  if (av === undefined && bv === undefined) {
    throw new Error("av 和 bv 不能同时为空");
  }

  const [avNumber, setAvNumber] = useState<number | undefined>(av);
  const [bvString, setBvString] = useState<string | undefined>(bv);
  const [load, setLoad] = useState(!!autoplay);
  const [height, setHeight] = useState("500px");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (avNumber === undefined) {
      setAvNumber(BVtoAV(bvString!));
    } else if (bvString === undefined) {
      setBvString(AVtoBV(avNumber));
    }
  }, [avNumber, bvString]);

  const src = `https://player.bilibili.com/player.html?aid=${avNumber}&page=1&as_wide=1&high_quality=1&danmaku=0`;

  const loadVid = () => {
    setLoad(true);
    if (imgRef.current) {
      setHeight(window.getComputedStyle(imgRef.current).height);
    }
  };

  return (
    <div className="bilicontainer">
      {load ? (
        <div className="bili">
          <iframe height={height} className="bili" title="哔哩哔哩视频" src={src} />
        </div>
      ) : (
        <>
          <img
            ref={imgRef}
            role="button"
            aria-label="点击即从哔哩哔哩加载视频"
            title="点击即从哔哩哔哩加载视频"
            className="bili-cover max-inline-full block-auto"
            tabIndex={0}
            aria-pressed="false"
            onClick={loadVid}
            onKeyUp={(e) => e.key === 'Enter' && loadVid()}
            src={thumbnail}
            alt={`${avNumber} 视频封面`}
          />
          视频 <code>AV{avNumber}</code> / <code>{bvString}</code>：
          <button onClick={loadVid}>从哔哩哔哩加载</button>
          <a href={`https://www.bilibili.com/video/${bvString}`}>去哔哩哔哩观看</a>
          <small>
            也可以点击视频封面加载视频。注意哔哩哔哩弹幕网可能会收集您的信息，这与本站无关。在阁下进行操作前，网页不会与哔哩哔哩弹幕网建立连接。
          </small>
        </>
      )}
    </div>
  );
};

export default Bilibili;
