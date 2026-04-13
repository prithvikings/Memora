export const KeyboardCard = () => (
  <div className="rounded-2xl bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-900 dark:shadow-white/5 dark:ring-white/10">
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-2 p-6">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
          SDK available for everything
        </h3>
        <p className="text-sm text-balance text-neutral-600 dark:text-neutral-400">
          Native SDKs for every platform. React, Vue, iOS, Android, and more.
        </p>
      </div>
      <div className="mt-auto flex flex-1 items-center justify-center overflow-hidden mask-r-from-50% pt-4">
        <div className="mx-auto w-fit origin-center translate-x-12 translate-y-10 scale-220 md:translate-x-10 md:-translate-y-6">
          <div className="rounded-xl bg-neutral-200 p-[3px] shadow-sm ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10">
            {/* Row 1 */}
            <div className="mb-px flex gap-px">
              <div className="flex h-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] w-5 rounded-tl-lg">
                esc
              </div>
              {[
                "F1",
                "F2",
                "F3",
                "F4",
                "F5",
                "F6",
                "F7",
                "F8",
                "F9",
                "F10",
                "F11",
                "F12",
              ].map((k) => (
                <div
                  key={k}
                  className="flex h-3 w-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)]"
                >
                  {k}
                </div>
              ))}
              <div className="flex h-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] rounded-tr-lg w-5">
                <div className="size-1.5 rounded-full bg-linear-to-b from-neutral-300 via-neutral-200 to-neutral-300 p-px dark:from-neutral-600 dark:via-neutral-700 dark:to-neutral-600">
                  <div className="size-full rounded-full bg-neutral-100 dark:bg-neutral-800" />
                </div>
              </div>
            </div>
            {/* Row 2 */}
            <div className="mb-px flex gap-px">
              {[
                "~",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "0",
                "-",
                "=",
              ].map((k) => (
                <div
                  key={k}
                  className="flex h-3 w-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)]"
                >
                  {k}
                </div>
              ))}
              <div className="flex h-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] w-5">
                delete
              </div>
            </div>
            {/* Row 3 */}
            <div className="mb-px flex gap-px">
              <div className="flex h-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] w-5">
                tab
              </div>
              {[
                "Q",
                "W",
                "E",
                "R",
                "T",
                "Y",
                "U",
                "I",
                "O",
                "P",
                "[",
                "]",
                "\\",
              ].map((k) => (
                <div
                  key={k}
                  className="flex h-3 w-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)]"
                >
                  {k}
                </div>
              ))}
            </div>
            {/* Row 4 */}
            <div className="mb-px flex gap-px">
              <div className="flex h-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] w-[22px]">
                caps
              </div>
              {["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"].map(
                (k) => (
                  <div
                    key={k}
                    className="flex h-3 w-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)]"
                  >
                    {k}
                  </div>
                ),
              )}
              <div className="flex h-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] w-[23px]">
                return
              </div>
            </div>
            {/* Row 5 */}
            <div className="mb-px flex gap-px">
              <div className="flex h-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] w-[29px]">
                shift
              </div>
              {["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"].map((k) => (
                <div
                  key={k}
                  className="flex h-3 w-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)]"
                >
                  {k}
                </div>
              ))}
              <div className="flex h-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] w-[29px]">
                shift
              </div>
            </div>
            {/* Row 6 */}
            <div className="mb-px flex gap-px">
              <div className="flex h-3 w-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] rounded-bl-lg">
                fn
              </div>
              <div className="flex h-3 w-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)]">
                ctrl
              </div>
              <div className="flex h-3 w-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)]">
                opt
              </div>
              <div className="flex h-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] w-4">
                cmd
              </div>
              <div className="flex h-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] w-[66px]" />
              <div className="flex h-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] w-4">
                cmd
              </div>
              <div className="flex h-3 w-3 cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)]">
                opt
              </div>
              <div className="flex h-3 items-center gap-px rounded-[2px]">
                <div className="flex cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] h-3 w-3">
                  ←
                </div>
                <div className="flex flex-col gap-px">
                  <div className="flex cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] h-[5.5px] w-3">
                    ↑
                  </div>
                  <div className="flex cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] h-[5.5px] w-3">
                    ↓
                  </div>
                </div>
                <div className="flex cursor-default items-center justify-center rounded-[2px] bg-neutral-100 text-[3px] font-medium text-neutral-700 shadow-[0_0.5px_0.5px_0_rgba(0,0,0,0.1),inset_0_0.5px_0_0_rgba(255,255,255,1)] h-3 w-3 rounded-br-lg">
                  →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
