"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { useCallback, useRef } from "react";
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiH1,
  RiH2,
  RiH3,
  RiListUnordered,
  RiListOrdered,
  RiDoubleQuotesL,
  RiCodeLine,
  RiCodeBlock,
  RiLink,
  RiLinkUnlink,
  RiImageLine,
  RiYoutubeLine,
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiSeparator,
} from "react-icons/ri";

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "tiptap-link" } }),
      Youtube.configure({ width: 640, height: 360, HTMLAttributes: { class: "tiptap-youtube" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start writing your post…" }),
      CharacterCount,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href ?? "";
    const url = window.prompt("Enter URL", prev);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  const addYoutube = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter YouTube URL");
    if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
  }, [editor]);

  const uploadImage = useCallback(
    async (file: File) => {
      if (!editor) return;
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) { alert("Image upload failed"); return; }
      const { url } = await res.json();
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    },
    [editor]
  );

  if (!editor) return null;

  const btn = (active: boolean) =>
    `p-1.5 transition-colors ${
      active
        ? "bg-black text-white dark:bg-white dark:text-black"
        : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
    }`;

  const divider = <div className="w-px h-5 bg-black/20 dark:bg-white/20 mx-0.5" />;

  return (
    <div className="border border-black/20 dark:border-white/20">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
        <button type="button" title="Undo" className={btn(false)} onClick={() => editor.chain().focus().undo().run()}>
          <RiArrowGoBackLine size={16} />
        </button>
        <button type="button" title="Redo" className={btn(false)} onClick={() => editor.chain().focus().redo().run()}>
          <RiArrowGoForwardLine size={16} />
        </button>
        {divider}

        <button type="button" title="Bold" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>
          <RiBold size={16} />
        </button>
        <button type="button" title="Italic" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <RiItalic size={16} />
        </button>
        <button type="button" title="Underline" className={btn(editor.isActive("underline"))} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <RiUnderline size={16} />
        </button>
        <button type="button" title="Strikethrough" className={btn(editor.isActive("strike"))} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <RiStrikethrough size={16} />
        </button>
        <button type="button" title="Inline code" className={btn(editor.isActive("code"))} onClick={() => editor.chain().focus().toggleCode().run()}>
          <RiCodeLine size={16} />
        </button>
        {divider}

        <button type="button" title="Heading 1" className={btn(editor.isActive("heading", { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <RiH1 size={16} />
        </button>
        <button type="button" title="Heading 2" className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <RiH2 size={16} />
        </button>
        <button type="button" title="Heading 3" className={btn(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <RiH3 size={16} />
        </button>
        {divider}

        <button type="button" title="Bullet list" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <RiListUnordered size={16} />
        </button>
        <button type="button" title="Ordered list" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <RiListOrdered size={16} />
        </button>
        <button type="button" title="Blockquote" className={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <RiDoubleQuotesL size={16} />
        </button>
        <button type="button" title="Code block" className={btn(editor.isActive("codeBlock"))} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <RiCodeBlock size={16} />
        </button>
        <button type="button" title="Horizontal rule" className={btn(false)} onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <RiSeparator size={16} />
        </button>
        {divider}

        <button type="button" title="Align left" className={btn(editor.isActive({ textAlign: "left" }))} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <RiAlignLeft size={16} />
        </button>
        <button type="button" title="Align center" className={btn(editor.isActive({ textAlign: "center" }))} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <RiAlignCenter size={16} />
        </button>
        <button type="button" title="Align right" className={btn(editor.isActive({ textAlign: "right" }))} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <RiAlignRight size={16} />
        </button>
        {divider}

        <button type="button" title="Insert / edit link" className={btn(editor.isActive("link"))} onClick={setLink}>
          <RiLink size={16} />
        </button>
        <button type="button" title="Remove link" className={btn(false)} onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive("link")}>
          <RiLinkUnlink size={16} />
        </button>
        {divider}

        <button
          type="button"
          title="Upload image"
          className={btn(false)}
          onClick={() => fileInputRef.current?.click()}
        >
          <RiImageLine size={16} />
        </button>
        <button type="button" title="Embed YouTube video" className={btn(false)} onClick={addYoutube}>
          <RiYoutubeLine size={16} />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadImage(file);
            e.target.value = "";
          }}
        />
      </div>

      {/* Editor content area */}
      <EditorContent
        editor={editor}
        className="tiptap-editor min-h-[400px] p-4 prose prose-sm sm:prose dark:prose-invert max-w-none focus:outline-none"
      />

      {/* Footer: word / char count */}
      <div className="px-4 py-1.5 border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-xs text-black/40 dark:text-white/40 text-right">
        {editor.storage.characterCount.words()} words · {editor.storage.characterCount.characters()} characters
      </div>
    </div>
  );
}
