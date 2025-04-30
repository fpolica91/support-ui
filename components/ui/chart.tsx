"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { AxisBottom, AxisLeft } from "@visx/axis"
import { localPoint } from "@visx/event"
import { GridRows } from "@visx/grid"
import { Group } from "@visx/group"
import { scaleBand, scaleLinear } from "@visx/scale"
import { Bar, LinePath, Pie } from "@visx/shape"
import { useTooltip, useTooltipInPortal } from "@visx/tooltip"
import { Text } from "@visx/text"
import { curveMonotoneX } from "@visx/curve"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> })
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color)

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          })}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)

        return (
          <div
            key={item.value}
            className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground")}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config]
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle }

// Define chart components
export function BarChart({
  data,
  index,
  categories,
  colors = ["blue"],
  valueFormatter,
  yAxisWidth = 56,
  height = 300,
}: {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
  height?: number
}) {
  const margin = { top: 0, right: 0, bottom: 20, left: yAxisWidth }
  const { containerRef, TooltipInPortal } = useTooltipInPortal()
  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } = useTooltip()

  // Get dimensions
  const [width, setWidth] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        setWidth(entries[0].contentRect.width)
      })
      resizeObserver.observe(ref.current)
      return () => resizeObserver.disconnect()
    }
  }, [])

  // Scales
  const xScale = React.useMemo(
    () =>
      scaleBand({
        domain: data.map((d) => d[index]),
        padding: 0.3,
        range: [margin.left, width - margin.right],
      }),
    [data, index, margin.left, margin.right, width],
  )

  const yScale = React.useMemo(() => {
    const maxValue = Math.max(...data.map((d) => Math.max(...categories.map((c) => d[c] || 0))))
    return scaleLinear({
      domain: [0, maxValue * 1.1], // Add 10% padding
      range: [height - margin.bottom, margin.top],
      nice: true,
    })
  }, [data, categories, height, margin.bottom, margin.top])

  if (width === 0) {
    return <div ref={ref} style={{ height }} />
  }

  const colorScale = (i: number) => {
    const colorMap: Record<string, string> = {
      blue: "#3b82f6",
      green: "#22c55e",
      red: "#ef4444",
      yellow: "#eab308",
      purple: "#a855f7",
      pink: "#ec4899",
      indigo: "#6366f1",
      gray: "#6b7280",
      emerald: "#10b981",
      violet: "#8b5cf6",
      amber: "#f59e0b",
      rose: "#f43f5e",
    }
    const color = colors[i % colors.length]
    return colorMap[color] || color
  }

  const barWidth = xScale.bandwidth()

  return (
    <div ref={ref} style={{ height, position: "relative" }}>
      <svg width={width} height={height} ref={containerRef}>
        <GridRows
          scale={yScale}
          width={width - margin.left}
          left={margin.left}
          strokeDasharray="2,2"
          stroke="#e5e7eb"
        />
        <AxisLeft
          scale={yScale}
          left={margin.left}
          tickFormat={(value) => {
            if (valueFormatter) return valueFormatter(Number(value))
            return String(value)
          }}
          stroke="#e5e7eb"
          tickStroke="#e5e7eb"
          tickLabelProps={() => ({
            fill: "#6b7280",
            fontSize: 10,
            textAnchor: "end",
            dx: -4,
          })}
        />
        <AxisBottom
          scale={xScale}
          top={height - margin.bottom}
          stroke="#e5e7eb"
          tickStroke="#e5e7eb"
          tickLabelProps={() => ({
            fill: "#6b7280",
            fontSize: 10,
            textAnchor: "middle",
            dy: 4,
          })}
        />

        {categories.map((category, i) => (
          <Group key={`bars-${category}`}>
            {data.map((d, j) => {
              const value = d[category]
              const barHeight = height - margin.bottom - yScale(value)
              const barX = xScale(d[index]) || 0
              const barY = height - margin.bottom - barHeight

              return (
                <Bar
                  key={`bar-${category}-${j}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={colorScale(i)}
                  opacity={0.8}
                  onMouseMove={(event) => {
                    const point = localPoint(event)
                    if (point) {
                      showTooltip({
                        tooltipData: {
                          label: d[index],
                          value,
                          category,
                        },
                        tooltipLeft: point.x,
                        tooltipTop: point.y,
                      })
                    }
                  }}
                  onMouseLeave={() => hideTooltip()}
                />
              )
            })}
          </Group>
        ))}
      </svg>
      {tooltipData && (
        <TooltipInPortal
          left={tooltipLeft}
          top={tooltipTop}
          style={{
            backgroundColor: "white",
            padding: "8px",
            border: "1px solid #e5e7eb",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            fontSize: "12px",
          }}
        >
          <div>
            <strong>{(tooltipData as any).label}</strong>
          </div>
          <div>
            {(tooltipData as any).category}:{" "}
            {valueFormatter ? valueFormatter((tooltipData as any).value) : (tooltipData as any).value}
          </div>
        </TooltipInPortal>
      )}
    </div>
  )
}

export function LineChart({
  data,
  index,
  categories,
  colors = ["blue"],
  valueFormatter,
  yAxisWidth = 56,
  height = 300,
}: {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
  height?: number
}) {
  const margin = { top: 20, right: 20, bottom: 20, left: yAxisWidth }
  const { containerRef, TooltipInPortal } = useTooltipInPortal()
  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } = useTooltip()

  // Get dimensions
  const [width, setWidth] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        setWidth(entries[0].contentRect.width)
      })
      resizeObserver.observe(ref.current)
      return () => resizeObserver.disconnect()
    }
  }, [])

  // Scales
  const xScale = React.useMemo(
    () =>
      scaleBand({
        domain: data.map((d) => d[index]),
        padding: 0.3,
        range: [margin.left, width - margin.right],
      }),
    [data, index, margin.left, margin.right, width],
  )

  const yScale = React.useMemo(() => {
    const maxValue = Math.max(...data.map((d) => Math.max(...categories.map((c) => d[c] || 0))))
    return scaleLinear({
      domain: [0, maxValue * 1.1], // Add 10% padding
      range: [height - margin.bottom, margin.top],
      nice: true,
    })
  }, [data, categories, height, margin.bottom, margin.top])

  if (width === 0) {
    return <div ref={ref} style={{ height }} />
  }

  const colorScale = (i: number) => {
    const colorMap: Record<string, string> = {
      blue: "#3b82f6",
      green: "#22c55e",
      red: "#ef4444",
      yellow: "#eab308",
      purple: "#a855f7",
      pink: "#ec4899",
      indigo: "#6366f1",
      gray: "#6b7280",
      emerald: "#10b981",
      violet: "#8b5cf6",
      amber: "#f59e0b",
      rose: "#f43f5e",
    }
    const color = colors[i % colors.length]
    return colorMap[color] || color
  }

  return (
    <div ref={ref} style={{ height, position: "relative" }}>
      <svg width={width} height={height} ref={containerRef}>
        <GridRows
          scale={yScale}
          width={width - margin.left}
          left={margin.left}
          strokeDasharray="2,2"
          stroke="#e5e7eb"
        />
        <AxisLeft
          scale={yScale}
          left={margin.left}
          tickFormat={(value) => {
            if (valueFormatter) return valueFormatter(Number(value))
            return String(value)
          }}
          stroke="#e5e7eb"
          tickStroke="#e5e7eb"
          tickLabelProps={() => ({
            fill: "#6b7280",
            fontSize: 10,
            textAnchor: "end",
            dx: -4,
          })}
        />
        <AxisBottom
          scale={xScale}
          top={height - margin.bottom}
          stroke="#e5e7eb"
          tickStroke="#e5e7eb"
          tickLabelProps={() => ({
            fill: "#6b7280",
            fontSize: 10,
            textAnchor: "middle",
            dy: 4,
          })}
        />

        {categories.map((category, i) => (
          <Group key={`lines-${category}`}>
            <LinePath
              data={data}
              x={(d) => (xScale(d[index]) || 0) + xScale.bandwidth() / 2}
              y={(d) => yScale(d[category])}
              stroke={colorScale(i)}
              strokeWidth={2}
              curve={curveMonotoneX}
            />
            {data.map((d, j) => {
              const x = (xScale(d[index]) || 0) + xScale.bandwidth() / 2
              const y = yScale(d[category])

              return (
                <circle
                  key={`point-${category}-${j}`}
                  cx={x}
                  cy={y}
                  r={4}
                  fill="white"
                  stroke={colorScale(i)}
                  strokeWidth={2}
                  onMouseMove={(event) => {
                    const point = localPoint(event)
                    if (point) {
                      showTooltip({
                        tooltipData: {
                          label: d[index],
                          value: d[category],
                          category,
                        },
                        tooltipLeft: point.x,
                        tooltipTop: point.y,
                      })
                    }
                  }}
                  onMouseLeave={() => hideTooltip()}
                />
              )
            })}
          </Group>
        ))}
      </svg>
      {tooltipData && (
        <TooltipInPortal
          left={tooltipLeft}
          top={tooltipTop}
          style={{
            backgroundColor: "white",
            padding: "8px",
            border: "1px solid #e5e7eb",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            fontSize: "12px",
          }}
        >
          <div>
            <strong>{(tooltipData as any).label}</strong>
          </div>
          <div>
            {(tooltipData as any).category}:{" "}
            {valueFormatter ? valueFormatter((tooltipData as any).value) : (tooltipData as any).value}
          </div>
        </TooltipInPortal>
      )}
    </div>
  )
}

export function PieChart({
  data,
  index,
  categories,
  colors = ["blue", "green", "red", "yellow"],
  valueFormatter,
  height = 300,
}: {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  height?: number
}) {
  const margin = { top: 20, right: 20, bottom: 20, left: 20 }
  const { containerRef, TooltipInPortal } = useTooltipInPortal()
  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } = useTooltip()

  // Get dimensions
  const [width, setWidth] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        setWidth(entries[0].contentRect.width)
      })
      resizeObserver.observe(ref.current)
      return () => resizeObserver.disconnect()
    }
  }, [])

  if (width === 0) {
    return <div ref={ref} style={{ height }} />
  }

  const colorScale = (i: number) => {
    const colorMap: Record<string, string> = {
      blue: "#3b82f6",
      green: "#22c55e",
      red: "#ef4444",
      yellow: "#eab308",
      purple: "#a855f7",
      pink: "#ec4899",
      indigo: "#6366f1",
      gray: "#6b7280",
      emerald: "#10b981",
      violet: "#8b5cf6",
      amber: "#f59e0b",
      rose: "#f43f5e",
    }
    const color = colors[i % colors.length]
    return colorMap[color] || color
  }

  const category = categories[0]
  const pieData = data.map((d) => ({ ...d, value: d[category] }))
  const total = pieData.reduce((sum, d) => sum + d.value, 0)

  const radius = Math.min(width, height) / 2 - Math.max(...Object.values(margin))
  const centerX = width / 2
  const centerY = height / 2

  return (
    <div ref={ref} style={{ height, position: "relative" }}>
      <svg width={width} height={height} ref={containerRef}>
        <Group top={centerY} left={centerX}>
          <Pie data={pieData} pieValue={(d) => d.value} outerRadius={radius} innerRadius={radius / 2} padAngle={0.02}>
            {(pie) => {
              return pie.arcs.map((arc, i) => {
                const [centroidX, centroidY] = pie.path.centroid(arc)
                const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1
                const percent = (arc.data.value / total) * 100

                return (
                  <g key={`arc-${i}`}>
                    <path
                      d={pie.path(arc) || ""}
                      fill={colorScale(i)}
                      onMouseMove={(event) => {
                        const point = localPoint(event)
                        if (point) {
                          showTooltip({
                            tooltipData: {
                              label: arc.data[index],
                              value: arc.data.value,
                              percent,
                            },
                            tooltipLeft: point.x,
                            tooltipTop: point.y,
                          })
                        }
                      }}
                      onMouseLeave={() => hideTooltip()}
                    />
                    {hasSpaceForLabel && (
                      <Text
                        x={centroidX}
                        y={centroidY}
                        textAnchor="middle"
                        verticalAnchor="middle"
                        fill="white"
                        fontSize={12}
                        fontWeight="bold"
                      >
                        {percent >= 5 ? `${Math.round(percent)}%` : ""}
                      </Text>
                    )}
                  </g>
                )
              })
            }}
          </Pie>
        </Group>
      </svg>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {pieData.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", fontSize: "12px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: colorScale(i),
                marginRight: "4px",
                borderRadius: "2px",
              }}
            />
            <span>{d[index]}</span>
          </div>
        ))}
      </div>

      {tooltipData && (
        <TooltipInPortal
          left={tooltipLeft}
          top={tooltipTop}
          style={{
            backgroundColor: "white",
            padding: "8px",
            border: "1px solid #e5e7eb",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            fontSize: "12px",
          }}
        >
          <div>
            <strong>{(tooltipData as any).label}</strong>
          </div>
          <div>
            {valueFormatter ? valueFormatter((tooltipData as any).value) : (tooltipData as any).value}(
            {Math.round((tooltipData as any).percent)}%)
          </div>
        </TooltipInPortal>
      )}
    </div>
  )
}
