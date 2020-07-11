import React, {useEffect, FC, useState} from 'react';
import {Storygram, Config} from 'storygram';

type StorygramDrawerProps = {
    storyGram: Storygram
};

const StorygramDrawer: FC<StorygramDrawerProps> = ({storyGram}) => {

    const root = "storygramRoot";

    useEffect(() => {
        storyGram.remove()
        storyGram.config.root = "#" + root
        storyGram.draw();
        return () => storyGram.remove()
    }, [storyGram.processedData.events, storyGram.processedData.actors]);

    return (
        <div id={root}></div>
    );
};

export default StorygramDrawer;
