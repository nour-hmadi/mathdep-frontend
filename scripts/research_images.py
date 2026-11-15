"""Draws the pictures of the six demo research posts, each from the mathematics of its own topic.

Run from the repository root:  python3 scripts/research_images.py
It writes public/images/research/<name>.png (1200 x 900 pixels); the site serves them at /images/research/<name>.png.
"""
import math
from collections import deque
from pathlib import Path

import matplotlib

matplotlib.use("Agg")  # draws straight to files, no window
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.colors import LinearSegmentedColormap, PowerNorm

NAVY, BLUE, PINK, GOLD, TEAL, WHITE = "#0b2239", "#4aa3df", "#e8487a", "#f2b134", "#2ec4b6", "#e8eef5"
GLOW = LinearSegmentedColormap.from_list("glow", [NAVY, "#1d4f80", PINK, GOLD, "#fff6dc"])
OUT = Path("public/images/research")


def picture(name, formula, draw, full=False):
    """One picture: the drawing on top (or over the whole picture) and its formula at the bottom right."""
    fig = plt.figure(figsize=(12, 9), dpi=100, facecolor=NAVY)
    ax = fig.add_axes([0, 0, 1, 1] if full else [0.06, 0.25, 0.88, 0.69], facecolor=NAVY)
    ax.set_xticks([])
    ax.set_yticks([])
    for side in ax.spines.values():
        side.set_visible(False)
    draw(ax)
    fig.text(0.95, 0.1, formula, ha="right", va="center", fontsize=30, color=WHITE,
             bbox=dict(boxstyle="round,pad=0.4", facecolor=NAVY, edgecolor="none", alpha=0.85))
    fig.savefig(OUT / f"{name}.png", facecolor=NAVY)
    plt.close(fig)
    print(OUT / f"{name}.png")


def betweenness(graph):
    """Brandes' algorithm: for each stop, how many shortest trips between other stops pass through it."""
    score = dict.fromkeys(graph, 0.0)
    for source in graph:
        order, before = [], {v: [] for v in graph}
        paths, dist = dict.fromkeys(graph, 0), dict.fromkeys(graph, -1)
        paths[source], dist[source] = 1, 0
        queue = deque([source])
        while queue:
            v = queue.popleft()
            order.append(v)
            for w in graph[v]:
                if dist[w] < 0:
                    dist[w] = dist[v] + 1
                    queue.append(w)
                if dist[w] == dist[v] + 1:
                    paths[w] += paths[v]
                    before[w].append(v)
        share = dict.fromkeys(graph, 0.0)
        for w in reversed(order):
            for v in before[w]:
                share[v] += paths[v] / paths[w] * (1 + share[w])
            if w != source:
                score[w] += share[w]
    return score


def transport(ax):
    """Bus lines as a graph: each stop is sized by its betweenness, and the busiest stop glows."""
    stops = {"n1": (1.2, 5.5), "n2": (3.0, 5.9), "n3": (4.9, 5.6), "n5": (7.4, 5.8), "n6": (9.2, 5.5),
             "n7": (10.9, 5.9), "w1": (1.0, 3.4), "w2": (2.8, 3.7), "w3": (4.4, 3.5), "hub": (6.0, 3.6),
             "e5": (7.7, 3.4), "e6": (9.4, 3.8), "e7": (11.0, 3.5), "s1": (1.3, 1.5), "s2": (3.1, 1.2),
             "s3": (4.8, 1.6), "s5": (7.3, 1.3), "s6": (9.1, 1.6), "s7": (10.8, 1.2)}
    lines = [(PINK, "n1 n2 n3 hub s5 s6 s7"), (BLUE, "s1 s2 s3 hub n5 n6 n7"), (GOLD, "w1 w2 w3 hub e5 e6 e7"),
             (TEAL, "n2 w2 s2"), (TEAL, "n6 e6 s6")]
    graph = {stop: set() for stop in stops}
    for _, route in lines:
        route = route.split()
        for u, v in zip(route, route[1:]):
            graph[u].add(v)
            graph[v].add(u)
    score = betweenness(graph)
    busiest = max(score, key=score.get)
    for k in range(13):  # a faint street grid
        ax.axvline(k, color=WHITE, alpha=0.05, lw=1)
        ax.axhline(k * 0.6, color=WHITE, alpha=0.05, lw=1)
    for color, route in lines:
        ax.plot(*zip(*(stops[s] for s in route.split())), color=color, lw=8, alpha=0.9,
                solid_capstyle="round", solid_joinstyle="round", zorder=1)
    x, y = stops[busiest]
    for size, alpha in ((6000, 0.10), (3600, 0.18), (2200, 0.32)):
        ax.scatter(x, y, s=size, color=GOLD, alpha=alpha, linewidth=0, zorder=2)
    top = max(score.values())
    for stop, (x, y) in stops.items():
        ax.scatter(x, y, s=110 + 1100 * score[stop] / top, color=WHITE, edgecolor=NAVY, linewidth=3, zorder=3)
    ax.set_xlim(0.3, 11.7)
    ax.set_ylim(0.5, 6.6)


def heat(ax):
    """The heat equation solved with explicit finite differences: temperature along a rod (across) over time (up)."""
    n, r = 240, 0.45  # grid points; r = alpha * dt / dx^2, stable when r <= 1/2
    x = np.linspace(0, 1, n + 1)
    u = (np.exp(-((x - 0.22) / 0.04) ** 2) + 0.75 * np.exp(-((x - 0.55) / 0.07) ** 2)
         + 0.9 * np.exp(-((x - 0.82) / 0.035) ** 2))
    u[0] = u[-1] = 0  # both ends held at temperature 0
    rows = []
    for step in range(1600):  # explicit finite differences (FTCS)
        if step % 5 == 0:
            rows.append(u.copy())
        u[1:-1] = u[1:-1] + r * (u[2:] - 2 * u[1:-1] + u[:-2])
    rows = np.array(rows)
    ax.imshow(rows, cmap=GLOW, norm=PowerNorm(0.6, 0, 1), aspect="auto", origin="lower", extent=(0, 1, 0, 1),
              interpolation="bilinear")
    ax.contour(rows, levels=np.linspace(0.1, 0.9, 9), colors=WHITE, alpha=0.3, linewidths=1, origin="lower",
               extent=(0, 1, 0, 1))


def bayes(ax):
    """A Beta(2, 2) prior, the likelihood of 4 successes out of 5, and the Beta(6, 3) posterior they give."""
    x = np.linspace(0, 1, 500)

    def beta(a, b):
        return math.gamma(a + b) / (math.gamma(a) * math.gamma(b)) * x ** (a - 1) * (1 - x) ** (b - 1)

    ax.plot(x, beta(2, 2), color=BLUE, lw=4, ls="--")
    ax.plot(x, beta(5, 2), color=GOLD, lw=4, ls=":")
    ax.fill_between(x, beta(6, 3), color=PINK, alpha=0.3)
    ax.plot(x, beta(6, 3), color=PINK, lw=5)
    ax.text(0.17, 1.2, "prior", color=BLUE, fontsize=26, ha="center")
    ax.text(0.33, 3.05, "data: 4 of 5", color=GOLD, fontsize=26, va="center")
    ax.text(0.52, 2.35, "posterior", color=PINK, fontsize=26, ha="right")
    for k in range(5):  # the five observations: four successes, one failure
        ax.scatter(0.05 + 0.055 * k, 3.05, s=420, color=GOLD if k < 4 else NAVY, edgecolor=GOLD, linewidth=3)
    ax.axhline(0, color=WHITE, alpha=0.3, lw=2)
    ax.set_xlim(0, 1)
    ax.set_ylim(-0.05, 3.3)


def svd(ax):
    """The Mandelbrot set rebuilt from its first 2, 8 and 30 singular values, then from all of them."""
    h, w = 450, 600
    c = np.linspace(-2.25, 0.75, w)[None, :] + 1j * np.linspace(-1.125, 1.125, h)[:, None]  # the Mandelbrot set
    z, count, alive = np.zeros_like(c), np.zeros(c.shape), np.ones(c.shape, bool)
    for k in range(100):
        z[alive] = z[alive] ** 2 + c[alive]
        escaped = alive & (np.abs(z) > 2)
        count[escaped] = k + 1 - np.log2(np.log(np.abs(z[escaped])))
        alive &= ~escaped
    image = np.log1p(count) / np.log1p(count.max())  # the set itself stays 0: navy
    u, s, vt = np.linalg.svd(image, full_matrices=False)
    for i, k in enumerate((2, 8, 30, len(s))):
        x, y = i % 2 * 4, (1 - i // 2) * 3
        ax.imshow(np.clip((u[:, :k] * s[:k]) @ vt[:k], 0, 1), cmap=GLOW, extent=(x, x + 4, y, y + 3),
                  interpolation="bilinear")
        ax.text(x + 0.15, y + 2.85, f"rank {k}" if k < len(s) else f"full (rank {k})", va="top", color=WHITE,
                fontsize=24, bbox=dict(boxstyle="round,pad=0.3", facecolor=NAVY, edgecolor="none", alpha=0.85))
    ax.axvline(4, color=NAVY, lw=6)
    ax.axhline(3, color=NAVY, lw=6)
    ax.set_xlim(0, 8)
    ax.set_ylim(0, 6)


def primes(ax):
    """The Ulam spiral: 1, 2, 3, ... written in a square spiral, with the primes lit up."""
    half_w, half_h = 100, 75  # a 201 x 151 window around 1
    n = (2 * half_w + 1) ** 2
    sieve = np.ones(n + 1, bool)
    sieve[:2] = False
    for p in range(2, int(n ** 0.5) + 1):
        if sieve[p]:
            sieve[p * p::p] = False
    xs, ys, x, y, dx, dy, run = [0], [0], 0, 0, 1, 0, 1  # where 1, 2, 3, ... go: right 1, up 1, left 2, down 2, ...
    while len(xs) < n:
        for _ in range(2):
            for _ in range(run):
                x, y = x + dx, y + dy
                xs.append(x)
                ys.append(y)
            dx, dy = -dy, dx
        run += 1
    xs, ys = np.array(xs[:n]), np.array(ys[:n])
    lit = sieve[np.arange(1, n + 1)] & (np.abs(xs) <= half_w) & (np.abs(ys) <= half_h)
    distance = np.hypot(xs[lit], ys[lit]) / np.hypot(half_w, half_h)
    ax.scatter(xs[lit], ys[lit], s=11, marker="s", c=GLOW(0.95 - 0.5 * distance), linewidth=0)
    ax.set_xlim(-half_w - 0.5, half_w + 0.5)
    ax.set_ylim(-half_h - 0.5, half_h + 0.5)


def epidemic(ax):
    """The SIR model: the share of people infected each day, without vaccination and with 40% vaccinated."""
    def infected(vaccinated, beta=0.32, gamma=0.1, days=180, dt=0.05):
        s, i, curve = 1 - vaccinated - 0.001, 0.001, []
        for _ in range(int(days / dt)):
            new = beta * s * i * dt
            s, i = s - new, i + new - gamma * i * dt
            curve.append(i)
        return np.linspace(0, days, len(curve)), np.array(curve)

    ax.axhline(0.1, color=GOLD, lw=3, ls="--")
    ax.text(178, 0.112, "hospital capacity", color=GOLD, fontsize=24, ha="right")
    for vaccinated, color, label, where in ((0.0, PINK, "no vaccination", (66, 0.30)),
                                            (0.4, TEAL, "40% vaccinated", (128, 0.05))):
        t, i = infected(vaccinated)
        ax.fill_between(t, i, color=color, alpha=0.25)
        ax.plot(t, i, color=color, lw=5)
        ax.text(*where, label, color=color, fontsize=26)
    ax.axhline(0, color=WHITE, alpha=0.3, lw=2)
    ax.set_xlim(0, 180)
    ax.set_ylim(-0.005, 0.36)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    picture("graph-theory-transport", r"$C_B(v)=\sum_{s\neq v\neq t}\,\sigma_{st}(v)\,/\,\sigma_{st}$", transport)
    picture("heat-diffusion", r"$u_i^{n+1}=u_i^n+r\,(u_{i+1}^n-2u_i^n+u_{i-1}^n)$", heat)
    picture("bayesian-small-samples", r"$p(\theta\mid x)\;\propto\;p(x\mid\theta)\,p(\theta)$", bayes)
    picture("linear-algebra-svd", r"$A\approx\sum_{i=1}^{k}\sigma_i\,u_i\,v_i^{T}$", svd, full=True)
    picture("primes-security", r"$n=p\,q,\quad c\equiv m^{e}\ (\mathrm{mod}\ n)$", primes, full=True)
    picture("sir-epidemic", r"$\dot S=-\beta SI,\ \ \dot I=\beta SI-\gamma I,\ \ \dot R=\gamma I$", epidemic)
