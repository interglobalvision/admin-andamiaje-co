import { convertFromRaw, EditorState } from 'draft-js';

const ParseEditorContent = (rawContent)  => {

  if (rawContent) {
    // Convert JSON for Editor and create with content
    const contentState = convertFromRaw(JSON.parse(rawContent));

    return EditorState.createWithContent(contentState);

  } else {
    // No saved JSON. Create Editor without content
    return EditorState.createEmpty();
  }
}

export default ParseEditorContent;
