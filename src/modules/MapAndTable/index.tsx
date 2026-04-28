import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import MapboxMap from '../../components/MapboxMap';

export type Tfeature = {
  type: string;
  properties: properties;
  geometry: geometry;
  details?: any;
};

type properties = {
  name: string;
  styleUrl: string;
  styleHash: string;
  icon: string;
};

type geometry = {
  type: string;
  coordinates: number[];
};

type TMapAndTable = {
  records: Tfeature[];
  title: string;
  details: any;
};

type TPlaceDetail = {
  name: string;
  type?: string;
  distance_km?: number;
  description?: string;
};

type TPlaceOption = {
  record: Tfeature;
  detail: TPlaceDetail;
  category: string;
};

const HOME_NAME = 'Vista Monte Mar - TDM';

export const MapAndTable: FunctionComponent<TMapAndTable> = ({
  records,
  title,
  details,
}) => {
  const detailList = (details || []) as TPlaceDetail[];

  const places = useMemo<TPlaceOption[]>(() => {
    const detailByName = new Map(detailList.map((item) => [item.name, item]));

    return records
      .filter((record) => record.properties.name !== HOME_NAME)
      .map((record) => {
        const detail = detailByName.get(record.properties.name) || {
          name: record.properties.name,
          description: '',
          distance_km: undefined,
          type: title,
        };
        const category = (detail.type || title || 'Places').trim() || 'Places';
        return { record, detail, category };
      })
      .sort((a, b) => {
        const aDistance = a.detail.distance_km ?? Number.POSITIVE_INFINITY;
        const bDistance = b.detail.distance_km ?? Number.POSITIVE_INFINITY;
        if (aDistance !== bDistance) return aDistance - bDistance;
        return a.record.properties.name.localeCompare(b.record.properties.name);
      });
  }, [detailList, records, title]);

  const categories = useMemo(
    () => Array.from(new Set(places.map((place) => place.category))),
    [places]
  );

  const [selectedCategory, setSelectedCategory] = useState(
    categories[0] || 'Places'
  );
  const [selectedPlaceName, setSelectedPlaceName] = useState(
    places[0]?.record.properties.name || ''
  );

  useEffect(() => {
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory(categories[0] || 'Places');
    }
  }, [categories, selectedCategory]);

  const filteredPlaces = useMemo(
    () => places.filter((place) => place.category === selectedCategory),
    [places, selectedCategory]
  );

  useEffect(() => {
    if (!filteredPlaces.length) {
      setSelectedPlaceName('');
      return;
    }

    const stillValid = filteredPlaces.some(
      (place) => place.record.properties.name === selectedPlaceName
    );
    if (!stillValid) {
      setSelectedPlaceName(filteredPlaces[0].record.properties.name);
    }
  }, [filteredPlaces, selectedPlaceName]);

  const activePlace =
    filteredPlaces.find(
      (place) => place.record.properties.name === selectedPlaceName
    ) || filteredPlaces[0];

  const mapLink = activePlace
    ? `https://www.google.com/maps/dir/?api=1&origin=Condominio+Torres+del+Mar&destination=${encodeURIComponent(
        `${activePlace.record.properties.name} jaco ${activePlace.detail.type || ''}`.trim()
      )}`
    : '#';

  const distanceLabel =
    activePlace?.detail.distance_km != null
      ? `${activePlace.detail.distance_km} km`
      : 'Nearby';

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-[360px_minmax(0,1fr)] md:items-start">
      <aside className="rounded-2xl border border-[#dbe1e6] bg-white p-4 shadow-[0_12px_30px_rgba(30,41,59,0.08)]">
        <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f766e]">
            Trip Planner
          </p>
          <h3 className="mt-1 text-xl font-black leading-tight text-[#1f2937]">
            Explore Nearby {title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Step 1 choose a category. Step 2 pick a location.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#d9c1ab] bg-[#fff7ef] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#9b5d31]">
              {categories.length} categories
            </span>
            <span className="rounded-full border border-[#c8e2e1] bg-[#eefbfb] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0f766e]">
              {filteredPlaces.length} places
            </span>
          </div>
          <a
            href="#map-stage"
            className="mt-3 inline-flex rounded-full bg-[#0f766e] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm md:hidden"
          >
            Jump To Map
          </a>
        </div>

        <section className="mt-4 rounded-xl border border-[#e2e8f0] bg-white p-3">
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0f766e] text-xs font-bold text-white">
              1
            </span>
            <h4 className="text-sm font-bold uppercase tracking-wide text-[#334155]">
              Choose Category
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = category === selectedCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-all duration-150 ${
                    isActive
                      ? 'border-[#0f766e] bg-[#0f766e] text-white shadow-[0_8px_20px_rgba(15,118,110,0.35)]'
                      : 'border-[#cbd5e1] bg-[#f8fafc] text-slate-700 hover:border-[#14b8a6] hover:bg-[#f0fdfa] hover:text-[#0f766e]'
                  }`}
                >
                  {category || 'Places'}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-[#e2e8f0] bg-white p-3">
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1d4ed8] text-xs font-bold text-white">
              2
            </span>
            <h4 className="text-sm font-bold uppercase tracking-wide text-[#334155]">
              Pick Place
            </h4>
          </div>

          <div className="max-h-[28rem] space-y-2 overflow-auto pr-1">
            {!filteredPlaces.length && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                No places in this category. Choose another category.
              </div>
            )}

            {filteredPlaces.map((place) => {
              const placeName = place.record.properties.name;
              const isActive = placeName === activePlace?.record.properties.name;
              return (
                <button
                  type="button"
                  key={placeName}
                  onClick={() => setSelectedPlaceName(placeName)}
                  aria-selected={isActive}
                  className={`group w-full rounded-xl border p-3 text-left transition-all duration-150 ${
                    isActive
                      ? 'border-[#0f766e] bg-[#ecfeff] shadow-[0_10px_26px_rgba(15,118,110,0.16)] ring-2 ring-[#0f766e]/30'
                      : 'border-[#d4dce3] bg-[#f8fafc] hover:-translate-y-0.5 hover:border-[#14b8a6] hover:bg-[#f0fdfa]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-bold leading-snug text-slate-800">
                      {placeName}
                    </p>
                    <span
                      className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                        isActive
                          ? 'bg-[#0f766e] text-white'
                          : 'bg-[#e2e8f0] text-slate-600'
                      }`}
                    >
                      {place.detail.distance_km != null
                        ? `${place.detail.distance_km} km`
                        : 'Nearby'}
                    </span>
                  </div>
                  {place.detail.description && (
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 transition-colors duration-150 group-hover:text-slate-700">
                      {place.detail.description}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </aside>

      <div id="map-stage" className="space-y-3">
        <div className="rounded-xl border border-[#dbe1e6] bg-white p-3 shadow-[0_10px_25px_rgba(30,41,59,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0f766e]">
                Route Summary
              </p>
              <p className="text-base font-bold leading-tight text-slate-800">
                {activePlace?.record.properties.name || 'Select a place'}
              </p>
              <p className="text-xs text-slate-600">
                {selectedCategory} | {distanceLabel}
              </p>
            </div>
            <a
              href={mapLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#0f766e] bg-[#0f766e] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-[#0d5e58]"
            >
              Open In Google Maps
            </a>
          </div>
        </div>

        <MapboxMap
          coordinates={
            activePlace?.record.geometry.coordinates || records[0].geometry.coordinates
          }
          name={activePlace?.record.properties.name || title}
        />
      </div>
    </div>
  );
};

export default MapAndTable;
