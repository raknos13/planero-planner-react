import { forwardRef, useEffect, useCallback } from "react";

export const AutoResizeTextarea = forwardRef(
  (
    {
      value,
      onChange,
      onKeyDown,
      onBlur,
      className = "",
      placeholder,
      ...props
    },
    ref,
  ) => {
    const adjustHeight = useCallback(() => {
      if (!ref.current) return;

      // Reset height to min-height
      ref.current.style.height = "auto";

      // Get computed styles
      // const computed = window.getComputedStyle(ref.current);

      // Calculate border and padding
      // const borderHeight =
      //   parseFloat(computed.borderTopWidth) +
      //   parseFloat(computed.borderBottomWidth);

      // const padding =
      // parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);

      // ref.current.style.height = `${ref.current.scrollHeight + borderHeight + padding}px`;
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }, [ref]);

    // Adjust on mount and value change
    useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    const handleChange = (e) => {
      onChange?.(e);
      adjustHeight();
    };

    return (
      <textarea
        ref={ref}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        rows={1}
        {...props}
        className={`overflow-hidden resize-none ${className}`}
      />
    );
  },
);

// Set display name for better debugging
AutoResizeTextarea.displayName = "AutoResizeTextarea";
