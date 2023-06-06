interface TypeThumb {
    zIndex?: number
    height?: string
    width?: string
    image: string
    text?: string
}

const Thumb = ({ image, text = '' }: TypeThumb) => {
    return (
        <div className="tw-box-border tw-relative tw-shadow-thumb inline-block tw-w-[100%] tw-h-[100%] tw-rounded-full tw-cursor-default tw-border-5 tw-border-white tw-bg-white tw-group">
            <div className="tw-absolute tw-w-[inherit] tw-h-[inherit] tw-rounded-full tw-overflow-hidden tw-flex tw-justify-center tw-items-center">
                <div className="tw-box-border tw-w-[100%] tw-p-[10px] tw-text-center">{text}</div>
            </div>
            <div style={{ backgroundImage: `url(${image})` }} className="tw-w-[calc(100%-10px)] tw-h-[calc(100%-10px)] tw-bg-center tw-bg-cover tw-rounded-full tw-overflow-hidden tw-absolute tw-left-[5px] tw-top-[5px] tw-origin-[95%_40%] tw-transtion-all tw-duration-300 tw-ease-in-out group-hover:tw-rotate-[-110deg]"></div>
        </div>
    );
};

export default Thumb


  