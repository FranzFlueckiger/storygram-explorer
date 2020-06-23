import React, { useEffect, FC, useState } from 'react';
import { Storygram, Config } from 'storygram';

type StorygramWrapperProps = {
    data: any[];
    config: Config;
};

const StorygramWrapper: FC<StorygramWrapperProps> = ({ data, config }) => {
    const [isExpanded, setExpanded] = useState(false);

    const storyGram = new Storygram(data, config)

    const root = "storygramRoot-" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

    useEffect(() => {
        storyGram.config.root = "#" + root
        storyGram.draw();
        return () => storyGram.remove()
    }, [config, data, root]);

    return (
        <div id={root}></div>
    );
};

export default StorygramWrapper;
