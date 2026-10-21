import { useTranslations } from "next-intl";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FEATURES } from "../constants";

export function FeaturesTabs() {
  const t = useTranslations("features.items");

  return (
    <div className="scrollbar-hide mb-6 flex justify-center overflow-x-auto pb-3 sm:mb-8 sm:pb-0">
      <TabsList className="flex-nowrap rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-xs">
        {FEATURES.map(({ id, icon: Icon }) => (
          <TabsTrigger
            key={id}
            value={id}
            className="rounded-lg p-2 whitespace-nowrap data-[state=active]:bg-linear-to-r data-[state=active]:from-red-500 data-[state=active]:to-amber-500 data-[state=active]:text-white sm:px-3 sm:py-1.5"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </span>
              <span className="hidden text-sm sm:inline md:text-base">
                {t(`${id}.title`)}
              </span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
