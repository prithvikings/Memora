export const CollabCard = () => (
  <div className="rounded-2xl bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-900 dark:shadow-white/5 dark:ring-white/10 md:row-span-2">
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-2 p-6">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
          Real-time collaboration
        </h3>
        <p className="text-sm text-balance text-neutral-600 dark:text-neutral-400">
          Connect with your team instantly. AI-powered insights help you work
          smarter together.
        </p>
      </div>
      <div className="mt-auto flex flex-1 flex-col items-center justify-between gap-2 overflow-hidden pt-4">
        {/* Chat Bubbles */}
        <div className="flex items-center justify-center min-h-0 shrink p-2">
          <div className="flex flex-col justify-center gap-3">
            <div className="flex items-start gap-3 ">
              <img
                alt="AI Agent"
                className="size-8 shrink-0 rounded-full object-cover"
                src="https://assets.aceternity.com/avatars/1.webp"
                style={{ opacity: 1, transform: "none" }}
              />
              <div
                className="rounded-xl bg-white px-3 py-2 text-sm text-neutral-700 shadow-sm ring-1 shadow-black/5 ring-black/5 dark:bg-neutral-800 dark:text-neutral-200"
                style={{ opacity: 1, transform: "none" }}
              >
                Workflow completed. 847 tasks processed.
              </div>
            </div>
            <div className="flex items-start gap-3 flex-row-reverse">
              <img
                alt="You"
                className="size-8 shrink-0 rounded-full object-cover"
                src="https://assets.aceternity.com/avatars/manu.webp"
                style={{ opacity: 1, transform: "none" }}
              />
              <div
                className="rounded-xl bg-white px-3 py-2 text-sm text-neutral-700 shadow-sm ring-1 shadow-black/5 ring-black/5 dark:bg-neutral-800 dark:text-neutral-200"
                style={{ opacity: 1, transform: "none" }}
              >
                Deploy to production
              </div>
            </div>
            <div className="flex items-start gap-3 ">
              <img
                alt="AI Agent"
                className="size-8 shrink-0 rounded-full object-cover"
                src="https://assets.aceternity.com/avatars/8.webp"
                style={{ opacity: 1, transform: "none" }}
              />
              <div
                className="rounded-xl bg-white px-3 py-2 text-sm text-neutral-700 shadow-sm ring-1 shadow-black/5 ring-black/5 dark:bg-neutral-800 dark:text-neutral-200"
                style={{ opacity: 1, transform: "none" }}
              >
                Deployed. All systems operational.
              </div>
            </div>
          </div>
        </div>

        {/* Animated Lines */}
        <div className="relative flex w-full items-center justify-center gap-6 overflow-hidden px-8 h-24 shrink-0">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-linear-to-b from-white to-transparent dark:from-neutral-900" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-linear-to-t from-white to-transparent dark:from-neutral-900" />

          <div className="relative h-full w-px">
            <div className="absolute inset-0 border-l border-dashed border-neutral-300 dark:border-neutral-600" />
            <div
              className="absolute left-0 h-12 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent"
              style={{ opacity: 0, transform: "translateY(600%)" }}
            />
          </div>
          <div className="relative h-full w-px">
            <div className="absolute inset-0 border-l border-dashed border-neutral-300 dark:border-neutral-600" />
            <div
              className="absolute left-0 h-12 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent"
              style={{ opacity: 0, transform: "translateY(600%)" }}
            />
          </div>
          <div className="relative h-full w-px">
            <div className="absolute inset-0 border-l border-dashed border-neutral-300 dark:border-neutral-600" />
            <div
              className="absolute left-0 h-12 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent"
              style={{ opacity: 0, transform: "translateY(600%)" }}
            />
          </div>
          <div className="relative h-full w-px">
            <div className="absolute inset-0 border-l border-dashed border-neutral-300 dark:border-neutral-600" />
            <div
              className="absolute left-0 h-12 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent"
              style={{ opacity: 0.354, transform: "translateY(529.2%)" }}
            />
          </div>
          <div className="relative h-full w-px">
            <div className="absolute inset-0 border-l border-dashed border-neutral-300 dark:border-neutral-600" />
            <div
              className="absolute left-0 h-12 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent"
              style={{ opacity: 0.754, transform: "translateY(449.2%)" }}
            />
          </div>
          <div className="relative h-full w-px">
            <div className="absolute inset-0 border-l border-dashed border-neutral-300 dark:border-neutral-600" />
            <div
              className="absolute left-0 h-12 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent"
              style={{ opacity: 1, transform: "translateY(369.2%)" }}
            />
          </div>
          <div className="relative h-full w-px">
            <div className="absolute inset-0 border-l border-dashed border-neutral-300 dark:border-neutral-600" />
            <div
              className="absolute left-0 h-12 w-px bg-linear-to-b from-transparent via-blue-500 to-transparent"
              style={{ opacity: 1, transform: "translateY(289.2%)" }}
            />
          </div>
        </div>

        {/* Split Avatar View */}
        <div className="shrink-0 scale-75">
          <div className="mx-auto max-w-xl">
            <div className="relative h-60 w-52 rounded-lg bg-gray-200 p-4 dark:bg-neutral-800/50">
              <div
                className="[--color-dark:var(--color-neutral-800)] [--color:var(--color-neutral-400)] absolute left-[calc(var(--offset)/2*-1)] h-(--height) w-[calc(100%+var(--offset))] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] bg-size-[var(--width)_var(--height)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] mask-exclude z-30 dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] top-0"
                style={{
                  "--background": "#ffffff",
                  "--height": "1px",
                  "--width": "5px",
                  "--fade-stop": "90%",
                  "--offset": "200px",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "destination-out",
                }}
              />
              <div
                className="[--color-dark:var(--color-neutral-800)] [--color:var(--color-neutral-400)] absolute left-[calc(var(--offset)/2*-1)] h-(--height) w-[calc(100%+var(--offset))] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] bg-size-[var(--width)_var(--height)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] mask-exclude z-30 dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] top-auto bottom-0"
                style={{
                  "--background": "#ffffff",
                  "--height": "1px",
                  "--width": "5px",
                  "--fade-stop": "90%",
                  "--offset": "200px",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "destination-out",
                }}
              />
              <div
                className="[--color-dark:var(--color-neutral-800)] [--color:var(--color-neutral-400)] absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-(--width) bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] bg-size-[var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] mask-exclude z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] left-0"
                style={{
                  "--background": "#ffffff",
                  "--height": "5px",
                  "--width": "1px",
                  "--fade-stop": "90%",
                  "--offset": "80px",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "destination-out",
                }}
              />
              <div
                className="[--color-dark:var(--color-neutral-800)] [--color:var(--color-neutral-400)] absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-(--width) bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] bg-size-[var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] mask-exclude z-30 dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)] right-0 left-auto"
                style={{
                  "--background": "#ffffff",
                  "--height": "5px",
                  "--width": "1px",
                  "--fade-stop": "90%",
                  "--offset": "80px",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "destination-out",
                }}
              />

              <div className="relative h-full w-full overflow-hidden rounded-lg bg-white shadow-sm ring-1 shadow-black/10 ring-black/5 dark:bg-neutral-800">
                <div
                  className="absolute inset-0"
                  style={{ filter: "blur(0px)", opacity: 1 }}
                >
                  <img
                    width="300"
                    height="300"
                    alt="Second Person"
                    className="h-full w-full object-cover grayscale"
                    src="https://assets.aceternity.com/avatars/2.webp"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ clipPath: "inset(0px 37% 0px 0px)" }}
                  >
                    <img
                      width="300"
                      height="300"
                      alt="Second Person"
                      className="h-full w-full object-cover"
                      src="https://assets.aceternity.com/avatars/2.webp"
                    />
                  </div>
                  <div
                    className="absolute top-0 bottom-0 w-px bg-linear-to-b from-transparent via-sky-500 to-transparent"
                    style={{
                      left: "63%",
                      boxShadow:
                        "rgba(59, 130, 246, 0.9) 0px 0px 20px, rgba(99, 102, 241, 0.7) 0px 0px 40px, rgba(139, 92, 246, 0.5) 0px 0px 60px",
                      opacity: 1,
                    }}
                  >
                    <span
                      className="absolute rounded-full"
                      style={{
                        left: "-13.5744px",
                        top: "10.9764%",
                        width: "2.08257px",
                        height: "2.08257px",
                        backgroundColor: "var(--color-blue-500)",
                        boxShadow:
                          "0 0 1.0412860424239423px var(--color-blue-500)",
                        opacity: 0.952608,
                        transform: "translateX(-9.52608px) scale(1.42891)",
                      }}
                    />
                    <span
                      className="absolute rounded-full"
                      style={{
                        left: "-8.49718px",
                        top: "37.9349%",
                        width: "1.75071px",
                        height: "1.75071px",
                        backgroundColor: "var(--color-blue-500)",
                        boxShadow:
                          "0 0 0.875356237557976px var(--color-blue-500)",
                        opacity: 0.730374,
                        transform: "translateX(-12.6963px) scale(1.09556)",
                      }}
                    />
                    <span
                      className="absolute rounded-full"
                      style={{
                        left: "-12.1012px",
                        top: "9.70187%",
                        width: "1.92723px",
                        height: "1.92723px",
                        backgroundColor: "var(--color-purple-500)",
                        boxShadow:
                          "0 0 0.963615734161305px var(--color-purple-500)",
                        opacity: 0.963373,
                        transform: "translateX(-9.63373px) scale(1.44506)",
                      }}
                    />
                    <span
                      className="absolute rounded-full"
                      style={{
                        left: "-8.06829px",
                        top: "59.5619%",
                        width: "2.71558px",
                        height: "2.71558px",
                        backgroundColor: "var(--color-purple-500)",
                        boxShadow:
                          "0 0 1.357791556237069px var(--color-purple-500)",
                        opacity: 0.623724,
                        transform: "translateX(-13.7628px) scale(0.935586)",
                      }}
                    />
                    <span
                      className="absolute rounded-full"
                      style={{
                        left: "-14.4369px",
                        top: "73.484%",
                        width: "1.62668px",
                        height: "1.62668px",
                        backgroundColor: "var(--color-violet-500)",
                        boxShadow:
                          "0 0 0.8133405323578083px var(--color-violet-500)",
                        opacity: 0.951599,
                        transform: "translateX(-10.484px) scale(1.4274)",
                      }}
                    />
                    <span
                      className="absolute rounded-full"
                      style={{
                        left: "-9.50825px",
                        top: "54.8419%",
                        width: "2.57552px",
                        height: "2.57552px",
                        backgroundColor: "var(--color-blue-500)",
                        boxShadow:
                          "0 0 1.287759071337526px var(--color-blue-500)",
                        opacity: 0.936115,
                        transform: "translateX(-9.36115px) scale(1.40417)",
                      }}
                    />
                    <span
                      className="absolute rounded-full"
                      style={{
                        left: "-13.5629px",
                        top: "86.5327%",
                        width: "1.49694px",
                        height: "1.49694px",
                        backgroundColor: "var(--color-purple-500)",
                        boxShadow:
                          "0 0 0.7484689392741354px var(--color-purple-500)",
                        opacity: 0.910597,
                        transform: "translateX(-9.10597px) scale(1.3659)",
                      }}
                    />
                    <span
                      className="absolute rounded-full"
                      style={{
                        left: "-10.9822px",
                        top: "40.2761%",
                        width: "2.77582px",
                        height: "2.77582px",
                        backgroundColor: "var(--color-blue-500)",
                        boxShadow:
                          "0 0 1.3879124988773728px var(--color-blue-500)",
                        opacity: 0.678434,
                        transform: "translateX(-13.2157px) scale(1.01765)",
                      }}
                    />
                    <span
                      className="absolute rounded-full"
                      style={{
                        left: "-8px",
                        top: "20%",
                        width: "2px",
                        height: "2px",
                        backgroundColor: "var(--color-blue-500)",
                        transform: "scale(0.727736)",
                      }}
                    />
                    <span
                      className="absolute rounded-full"
                      style={{
                        left: "-12px",
                        top: "35%",
                        width: "2px",
                        height: "2px",
                        backgroundColor: "var(--color-sky-500)",
                        transform: "scale(0.00981671)",
                      }}
                    />
                    <span
                      className="absolute rounded-full"
                      style={{
                        left: "-16px",
                        top: "50%",
                        width: "2px",
                        height: "2px",
                        backgroundColor: "var(--color-violet-500)",
                        transform: "scale(0.14944)",
                      }}
                    />
                    <span
                      className="absolute rounded-full"
                      style={{
                        left: "-20px",
                        top: "65%",
                        width: "2px",
                        height: "2px",
                        backgroundColor: "var(--color-purple-500)",
                        transform: "scale(0.399178)",
                      }}
                    />
                    <span
                      className="absolute rounded-full"
                      style={{
                        left: "-24px",
                        top: "80%",
                        width: "2px",
                        height: "2px",
                        backgroundColor: "var(--color-blue-500)",
                        transform: "scale(0.727736)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
