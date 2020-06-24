import React, { useEffect, FC, useState } from 'react';
import { Storygram, Config } from 'storygram';

type StorygramDrawerProps = {
    storyGram: Storygram,
    config: Config,
    data: any[]
};

const StorygramDrawer: FC<StorygramDrawerProps> = ({ storyGram, config, data }) => {

    const root = "storygramRoot-" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    console.log('Drawn!')

    useEffect(() => {
        storyGram.remove()
        storyGram.config.root = "#" + root
        storyGram.draw();
        return () => storyGram.remove()
    }, [config, data]);

    return (
        <div id={root}></div>
    );
};

export default StorygramDrawer;
