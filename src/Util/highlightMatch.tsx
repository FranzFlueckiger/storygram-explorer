import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import React from 'react';

export const highLightMatch = (query: string, target: string) => {
    const matches = match(target, query);
    const parts = parse(target, matches);

    return (
        <div>
            {
                parts.map((part, index) => (
                    <span key={index} style={{fontWeight: part.highlight ? 700 : 400}} >
                        {part.text}
                    </span>
                ))
            }
        </div>
    );
}
