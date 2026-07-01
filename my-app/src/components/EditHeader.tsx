"use client";

type EditHeaderProps = { onClose: () => void };

export default function EditHeader({ onClose }: EditHeaderProps) {
  return (
    <div className="relative mb-4 flex items-center justify-center">
      <button
        type="button"
        onClick={onClose}
        className="absolute left-0 text-xl"
        aria-label="关闭"
      >
        ×
      </button>
      <h1 className="text-xl font-medium">编辑</h1>
    </div>
  );
}
