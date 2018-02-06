import { convertFromRaw, EditorState } from 'draft-js';

export const ParseEditorContent = (rawContent)  => {

  if (rawContent) {
    // Convert JSON for Editor and create with content
    const contentState = convertFromRaw(JSON.parse(rawContent));

    return EditorState.createWithContent(contentState);

  } else {
    // No saved JSON. Create Editor without content
    return EditorState.createEmpty();
  }
}

export const emptyEditorState = JSON.stringify({
  "entityMap": {},
  "blocks": [
    {
      "key": "3l1mm",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    }
  ]
});
