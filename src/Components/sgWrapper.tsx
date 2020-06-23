import React, { useEffect, FC, useState } from 'react';
import { Storygram, Config } from 'storygram';

type StorygramDrawerProps = {
    storyGram: Storygram
};

const StorygramDrawer: FC<StorygramDrawerProps> = ({ storyGram }) => {
    const [isExpanded, setExpanded] = useState(false);

    const root = "storygramRoot-" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

    useEffect(() => {
        storyGram.config.root = "#" + root
        storyGram.draw();
        return () => storyGram.remove()
    }, [root]);

    return (
        <div id={root}></div>
    );
};

export default StorygramDrawer;
